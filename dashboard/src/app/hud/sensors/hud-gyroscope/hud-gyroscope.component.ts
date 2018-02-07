import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-gyroscope',
  templateUrl: './hud-gyroscope.component.html',
  styleUrls: ['./hud-gyroscope.component.css']
})
export class HudGyroscopeComponent implements OnInit {

  constructor(private dataService: HudDataService) { }

  getSensor(): void {

  }

  ngOnInit() {
    this.getSensor();
  }

}
