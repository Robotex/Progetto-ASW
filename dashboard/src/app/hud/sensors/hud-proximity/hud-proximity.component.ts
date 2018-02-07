import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-proximity',
  templateUrl: './hud-proximity.component.html',
  styleUrls: ['./hud-proximity.component.css']
})
export class HudProximityComponent implements OnInit {

  constructor(private dataService: HudDataService) { }

  getSensor(): void {

  }

  ngOnInit() {
    this.getSensor();
  }

}
