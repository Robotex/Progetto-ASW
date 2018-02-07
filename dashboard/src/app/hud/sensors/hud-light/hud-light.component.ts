import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-light',
  templateUrl: './hud-light.component.html',
  styleUrls: ['./hud-light.component.css']
})
export class HudLightComponent implements OnInit {

  constructor(private dataService: HudDataService) { }

  getSensor(): void {
    this.dataService.getSensor("LIGHT").subscribe(sensor => {

    })
  }

  ngOnInit() {
  }

}