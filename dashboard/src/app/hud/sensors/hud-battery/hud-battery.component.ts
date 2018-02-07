import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-battery',
  templateUrl: './hud-battery.component.html',
  styleUrls: ['./hud-battery.component.css']
})
export class HudBatteryComponent implements OnInit {

  constructor(private dataService: HudDataService) { }

  getSensor(): void {

  }

  ngOnInit() {
    this.getSensor();
  }

}
