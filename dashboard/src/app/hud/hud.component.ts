import { Component, OnInit, OnDestroy } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { HudDataService } from './hud-data.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Message } from '@stomp/stompjs';

import { HudSensor } from './model/hud-sensor';
import { HudSensorData } from './model/hud-sensor-data';
import { HudSensorDetails } from './model/hud-sensor-details';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.css']
})

export class HudComponent implements OnInit, OnDestroy {

  constructor(private dataService: HudDataService) { }

  public subscribe() {
    this.dataService.subscribe();
  }

  public unsubscribe() {
    this.dataService.unsubscribe();
  }

  ngOnInit() {
    this.subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
