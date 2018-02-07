import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-pressure',
  templateUrl: './hud-pressure.component.html',
  styleUrls: ['./hud-pressure.component.css']
})
export class HudPressureComponent implements OnInit {

  constructor(private dataService: HudDataService) { }

  getSensor() : void {
    
  }

  ngOnInit() {
    this.getSensor();
  }

}
