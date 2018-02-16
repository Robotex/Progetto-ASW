import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';
import { HUD_SENSORS_DETAIL_NAME } from '../../model/hud-sensors-detail-enum';

@Component({
  selector: 'app-hud-proximity',
  templateUrl: './hud-proximity.component.html',
  styleUrls: ['./hud-proximity.component.css']
})
export class HudProximityComponent implements OnInit {

  value: number;
  warning_threshold: number;
  private sensor_type="PROXIMITY";
  private sensorProperties:{[key:string]:any};

  constructor(private dataService: HudDataService) { }

  getSensor(): void {
    this.dataService.getSensorObservable(this.sensor_type).subscribe(sensor=>{
      this.value = sensor.data.value;
      console.log(this.value);
      if (this.sensorProperties==null&&sensor.properties!=null&&sensor.properties!=undefined)
      {
        this.sensorProperties=sensor.properties;
        //this.min=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MIN_VALUE];
        //this.max=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MAX_VALUE];
        //this.delay=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.DELAY];
      }
      if (this.sensorProperties!=null)
      {
        this.warning_threshold = this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MAX_VALUE] * 0.10;
      }
    })
  }

  ngOnInit() {
    this.getSensor();
  }

}
