import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { StompService } from '@stomp/ng2-stompjs';
import { MatIconRegistry } from '@angular/material';
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

  constructor(private dataService: HudDataService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  public connect() {
    this.dataService.connect();
  }

  public disconnect() {
    this.dataService.disconnect();
  }

  ngOnInit() {
    this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg'));
  }

  ngOnDestroy() {
  }
}
