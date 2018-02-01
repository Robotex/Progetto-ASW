import { Component, OnInit, OnDestroy } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Message } from '@stomp/stompjs';

import { HudSensorData } from './model/hud-sensor-data';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.css']
})

export class HudComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public messages: Observable<Message>;
  public sensors: HudSensorData[] = [];

  public subscribed: boolean;

  constructor(private _stompService: StompService) { }

  public subscribe() {
    if (this.subscribed) {
      return;
    }

    this.messages = this._stompService.subscribe('/topic/reply');
    this.subscription = this.messages.map((message: Message) => {
      return message.body;
    }).subscribe((msg_body: string) => {
      let sensorData = <HudSensorData>JSON.parse(msg_body);
      var sensor = this.sensors.find(function(element) {
        return element.sensor === sensorData.sensor;
      });
      if (sensor !== undefined)
        sensor.value = sensorData.value;
      else
        this.sensors.push(sensorData);
    });
    this.subscribed = true;
  }

  public unsubscribe() {
    if (!this.subscribed) {
      return;
    }

    this.subscription.unsubscribe();
    this.subscription = null;
    this.messages = null;

    this.subscribed = false;
  }

  // Callbacks
  public onSensorData = (message: Message) => {
    let sensorData = <HudSensorData>JSON.parse(message.body);
    //this.sensors[sensorData.sensor] = sensorData;
  }

  ngOnInit() {
    this.subscribed = false;

    this.subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
