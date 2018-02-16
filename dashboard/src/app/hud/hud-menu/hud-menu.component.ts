import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../hud-data.service';
import { HudSensor } from '../model/hud-sensor';
//import { HUD_SENSORS_DETAIL_NAME } from '../model/hud-sensors-detail-enum';

class HudMenuSensor {
  name: string;
  status: string;
  delay: number;
}

@Component({
  selector: 'app-hud-menu',
  templateUrl: './hud-menu.component.html',
  styleUrls: ['./hud-menu.component.css']
})
export class HudMenuComponent implements OnInit {

  public sensors: HudMenuSensor[] = [];

  constructor(private dataService: HudDataService) { }

  getSensors(): void {
    let rawSensors = this.dataService.getAllSensors();
    this.sensors.length = 0;
    for (let s of rawSensors) {
      this.sensors.push({
        name: s.details.sensor,
        status: (s.status === undefined ? "?" : s.status.value),
        delay: s.delay
      });
    }
  }

  ngOnInit() {
  }

}
