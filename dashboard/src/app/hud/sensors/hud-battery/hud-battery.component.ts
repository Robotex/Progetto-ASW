import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';
import { SpeechService } from '../../speech.service';
import { DEFAULT_WARNING_VOICE_MESSAGE, DEFAULT_INFO_VOICE_MESSAGE } from '../../model/hud-voice';

@Component({
  selector: 'app-hud-battery',
  templateUrl: './hud-battery.component.html',
  styleUrls: ['./hud-battery.component.css']
})
export class HudBatteryComponent implements OnInit {

  value: number;
  private loading: boolean;
  private battery_level:string;
  private sensor_type="BATTERY";
  private sensorProperties:{[key:string]:any};

  constructor(private dataService: HudDataService,private speechService: SpeechService) { }

  getSensor(): void {
    this.dataService.getSensorObservable(this.sensor_type).subscribe(sensor=>{
      
      let value = sensor.data.value;
      if (value>this.value)
      {
        if (!this.loading)
            this.chargingAlert();
         this.loading=true;
      }
      else this.loading=false;
      this.value=value;
      this.changeLevel(this.value);

      if (this.sensorProperties==null&&sensor.properties!=null&&sensor.properties!=undefined)
      {
        this.sensorProperties=sensor.properties;
        //this.min=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MIN_VALUE];
        //this.max=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MAX_VALUE];
        //this.delay=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.DELAY];
      }
      if (this.sensorProperties!=null)
      {

      }
    })
  }

  changeLevel(value:number)
  {
    if (value>80)
    {
      if (this.battery_level!="FULL")
          this.chargedAlert();
      this.battery_level="FULL";
    }
    else if (value<=80 && value >= 30)
    {
      if (this.battery_level!="MEDIUM" && !this.loading)
          this.mediumBatteryAlert();
      this.battery_level="MEDIUM";
    }
    else
    {
      if (this.battery_level!="LOW")
          this.lowBatteryAlert();
        this.battery_level="LOW";
    }
  }

  chargedAlert()
  {
    this.speechService.speakDefaultInfoMessage(DEFAULT_INFO_VOICE_MESSAGE.BATTERY_FULL_CHARGED);
  }

  chargingAlert()
  {
    this.speechService.speakDefaultInfoMessage(DEFAULT_INFO_VOICE_MESSAGE.BATTERY_CHARGING);
  }

  mediumBatteryAlert()
  {
    this.speechService.speakDefaultInfoMessage(DEFAULT_INFO_VOICE_MESSAGE.BATTERY_MEDIUM_CHARGE);
  }

  lowBatteryAlert()
  {
    this.speechService.speakDefaultWarningMessage(DEFAULT_WARNING_VOICE_MESSAGE.SENSOR_LOW_BATTERY);
  }


  ngOnInit() {
    this.getSensor();
    this.speechService.init();
  }

}
