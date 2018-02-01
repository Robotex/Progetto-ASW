import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hud-map',
  templateUrl: './hud-map.component.html',
  styleUrls: ['./hud-map.component.css']
})
export class HudMapComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor() { }

  ngOnInit() {
  }

}
