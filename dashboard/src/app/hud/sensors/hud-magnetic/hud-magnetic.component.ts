import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-magnetic',
  templateUrl: './hud-magnetic.component.html',
  styleUrls: ['./hud-magnetic.component.css']
})
export class HudMagneticComponent implements OnInit {

  private sensor_type="MAGNETIC";
  private sensorProperties:{[key:string]:any};

  constructor(private dataService: HudDataService) { }

  getSensor(): void {
    this.dataService.getSensorObservable(this.sensor_type).subscribe(sensor=>{
      let vector=sensor.data.value;
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
