import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-accelerometer',
  templateUrl: './hud-accelerometer.component.html',
  styleUrls: ['./hud-accelerometer.component.css']
})
export class HudAccelerometerComponent implements OnInit {

  x: number = 0;
  y: number = 0;
  z: number = 0;

  constructor(private dataService: HudDataService) { }

  getSensor(): void {
    this.dataService.getSensor("ACCELEROMETER").subscribe(sensor => {
      this.x = sensor.data.value.x;
      this.y = sensor.data.value.y;
      this.z = sensor.data.value.z;
    })
  }

  ngOnInit() {
    this.getSensor();
  }

}
