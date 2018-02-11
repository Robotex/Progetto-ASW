import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-pressure',
  templateUrl: './hud-pressure.component.html',
  styleUrls: ['./hud-pressure.component.css']
})
export class HudPressureComponent implements OnInit {

  value: number = 0;

  constructor(private dataService: HudDataService) { }

  getSensor() : void {
    this.dataService.getSensorObservable("PRESSURE").subscribe(sensor => {
      this.value = sensor.data.value;
    })
  }

  ngOnInit() {
    this.getSensor();
  }

}
