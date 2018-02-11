import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-temperature',
  templateUrl: './hud-temperature.component.html',
  styleUrls: ['./hud-temperature.component.css']
})
export class HudTemperatureComponent implements OnInit {

  constructor(private dataService: HudDataService) { }

  getSensor(): void {
    this.dataService.getSensorObservable("TEMPERATURE").subscribe(sensor => {

    })
  }

  ngOnInit() {
    this.getSensor();
  }

}
