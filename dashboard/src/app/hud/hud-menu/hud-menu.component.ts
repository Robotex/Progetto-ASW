import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../hud-data.service';
import { HudSensor } from '../model/hud-sensor';
import { HUD_SENSORS_DETAIL_NAME } from '../model/hud-sensors-detail-enum';

class HudMenuSensor {
  icon: string;
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
  icons: {
    [sensor: string]: string
  } = {
    "LIGHT": "lightbulb_outline",
    "GPS": "navigation",
    "BATTERY": "battery_std",
    "ACCELEROMETER": "directions_run",
    "CAMERA": "photo_camera",
    "MAGNETIC": "explore",
    "ORIENTATION": "cached",
    "PRESSURE": "vertical_align_center",
    "PROXIMITY": "network_wifi",
    "TEMPERATURE": "wb_incandescent"
  };

  constructor(private dataService: HudDataService) { }

  getSensors(): void {
    let rawSensors = this.dataService.getAllSensors();
    this.sensors.length = 0;
    for (let s of rawSensors) {
      if (s.data === undefined)
        continue;
      this.sensors.push({
        name: s.details.sensor,
        icon: this.icons[s.details.sensor],
        status: (s.status === undefined ? "?" : s.status.value),
        delay: s.lastUpdate - s.data.timestamp - s.properties[HUD_SENSORS_DETAIL_NAME.DELAY]
      });
    }
  }

  ngOnInit() {
  }

}
