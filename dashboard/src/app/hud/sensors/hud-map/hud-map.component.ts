import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';
import { HudSensor } from '../../model/hud-sensor';

@Component({
  selector: 'app-hud-map',
  templateUrl: './hud-map.component.html',
  styleUrls: ['./hud-map.component.css']
})
export class HudMapComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private dataService: HudDataService) { }

  getSensor(): void {
    this.dataService.getSensor("GPS").subscribe(sensor => {
      this.lat = sensor.data.value.value.latitude;
      this.lng = sensor.data.value.value.longitude;
    })
  }

  ngOnInit() {
    this.getSensor();
  }

}
