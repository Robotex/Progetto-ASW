import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-battery',
  templateUrl: './hud-battery.component.html',
  styleUrls: ['./hud-battery.component.css']
})
export class HudBatteryComponent implements OnInit {

  value: number;
  private loading: boolean;
  private sensor_type="BATTERY";
  private sensorProperties:{[key:string]:any};

  constructor(private dataService: HudDataService) { }

  getSensor(): void {
    this.dataService.getSensorObservable(this.sensor_type).subscribe(sensor=>{
      
      let value = sensor.data.value;
      if (value>this.value) this.loading=true;
      else this.loading=false;
      this.value=value;
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

  ngOnInit() {
    this.getSensor();
  }

}
