import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../hud-data.service';
import { HudSensor } from '../model/hud-sensor';

@Component({
  selector: 'app-hud-menu',
  templateUrl: './hud-menu.component.html',
  styleUrls: ['./hud-menu.component.css']
})
export class HudMenuComponent implements OnInit {

  sensors : HudSensor[];
  
  constructor(private dataService: HudDataService) { }

  getSensors(): void {
    this.sensors = this.dataService.getAllSensors();
  }

  ngOnInit() {
  }

}
