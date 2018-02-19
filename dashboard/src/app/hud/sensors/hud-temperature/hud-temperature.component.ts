import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';
import { HUD_SENSORS_DETAIL_NAME } from '../../model/hud-sensors-detail-enum';
import { SpeechService } from '../../speech.service';
import { DEFAULT_WARNING_VOICE_MESSAGE } from '../../model/hud-voice';

@Component({
  selector: 'app-hud-temperature',
  templateUrl: './hud-temperature.component.html',
  styleUrls: ['./hud-temperature.component.css']
})
export class HudTemperatureComponent implements OnInit {

  value: number;
  warning_threshold: number;
  private sensor_type="TEMPERATURE";
  private sensorProperties:{[key:string]:any};
  private status:string;

  constructor(private dataService: HudDataService,private speechService:SpeechService) { }

  getSensor(): void {
    this.dataService.getSensorObservable(this.sensor_type).subscribe(sensor=>{
      this.value = sensor.data.value;
      if (this.sensorProperties==null&&sensor.properties!=null&&sensor.properties!=undefined)
      {
        this.sensorProperties=sensor.properties;
        //this.min=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MIN_VALUE];
        //this.max=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MAX_VALUE];
        //this.delay=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.DELAY];
      }
      if (this.sensorProperties!=null)
      {
        this.warning_threshold = this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MAX_VALUE] * 0.70;
      }
    })
  }

  check()
  {
    if (this.value>this.warning_threshold)
    {
      if (this.status!="OVERHEATING")
        this.speechService.speakDefaultWarningMessage(DEFAULT_WARNING_VOICE_MESSAGE.SENSOR_OVERHEATING);
      this.status="OVERHEATING";
    }
    else this.status="NORMAL";
  }

  ngOnInit() {
    this.getSensor();
    this.speechService.init();
  }

}
