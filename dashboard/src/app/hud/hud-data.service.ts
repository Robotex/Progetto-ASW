import { Injectable, OnDestroy } from '@angular/core';
import { HudSensor } from './model/hud-sensor';
import { HudSensorData } from './model/hud-sensor-data';
import { HudSensorDetails } from './model/hud-sensor-details';
import { HudSensorStatus } from './model/hud-sensor-status';
import { Message } from '@stomp/stompjs';
import { Observable } from 'rxjs/Observable';
import { StompRService, StompConfig } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of'
import { HUD_SENSORS_DETAIL_NAME } from './model/hud-sensors-detail-enum';

@Injectable()
export class HudDataService implements OnDestroy {

  private updatesSubscription: Subscription;
  private statusesSubscription: Subscription;
  private detailsSubscription: Subscription;
  public updates: Observable<Message>;
  public statuses: Observable<Message>;
  public details: Observable<Message>;
  public subscribed: boolean;

  public sensors: { [type: string]: HudSensor} = {};

  constructor(private stompConfig: StompConfig, private _stompService: StompRService) { 
    this.init();
  }

  public getAllSensors(): HudSensor[] {
    return Object.values(this.sensors).filter(s => s.details !== undefined);
  }

  public getSensor(whatSensor: string)
  {
    try
    {
      return this.sensors[whatSensor];
    }
    catch(e)
    {
      console.error(e);
      return undefined;
    }
  }

  public getSensorObservable(what: string): Observable<HudSensor> {
    if (this.sensors[what] !== undefined) {
      return this.sensors[what].subject.asObservable();
    } else {
      this.sensors[what] = new HudSensor();
      return this.sensors[what].subject.asObservable();
    }
  }

  public getSensorProperty(whatSensor:string,whatProperty:HUD_SENSORS_DETAIL_NAME):number
  {
    if (this.sensors[whatSensor] !== undefined)
    {
      return this.sensors[whatSensor].properties[HUD_SENSORS_DETAIL_NAME.MAX_VALUE];
    }
    
  }

  public getSensorLastDataRecorded(whatSensor:string):HudSensorData
  {
    try
    {
      if (this.sensors[whatSensor]!=undefined)
      {
        
        return this.sensors[whatSensor].data;
      }
    }
    catch(e)
    {
      console.error(e);
      return undefined;
    }
  }

  public getSensorProperties(whatSensor:string)
  {
    if (this.sensors[whatSensor]!== undefined)
    {
      return this.sensors[whatSensor].properties;
    }
  }

  public subscribe() {
    if (this.subscribed) {
      return;
    }
    this.details = this._stompService.subscribe('/sensors/details');
    if (this.details!= null && this.details)
    {
      this.updates = this._stompService.subscribe('/sensors/update');
      this.statuses = this._stompService.subscribe('/sensors/status');
    }

    this.updatesSubscription = this.updates.map((message: Message) => {
      return message.body;
    }).subscribe((msg_body: string) => {
      let now = (new Date).getTime();
      let sensorData = <HudSensorData>JSON.parse(msg_body);
      let sensor = this.sensors[sensorData.sensor];
      if (sensor !== undefined) {
        sensor.data = sensorData;
        sensor.delay = now-sensor.data.timestamp-sensor.properties[HUD_SENSORS_DETAIL_NAME.DELAY]
        sensor.subject.next(sensor);
      }
      /*else
      {
        sensor = new HudSensor();
        sensor.name = sensorData.sensor;
        sensor.data = sensorData;
        //this.sensors.push(sensor);
      }*/
    });

    this.statusesSubscription = this.statuses.map((message: Message) => {
      return message.body;
    }).subscribe((msg_body: string) => {
      let sensorData = <HudSensorStatus>JSON.parse(msg_body);
      let sensor = this.sensors[sensorData.sensor];
      if (sensor !== undefined) {
        sensor.status = sensorData;
      } /*else {
        sensor = new HudSensor();
        sensor.name = sensorData.sensor;
        sensor.status = sensorData;
      }*/
    });

    this.detailsSubscription = this.details.map((message: Message) => {
      return message.body;
    }).subscribe((msg_body: string) => {
      let sensorData = <HudSensorDetails>JSON.parse(msg_body);
      let sensorDataMap:{[key:string]:any}=sensorData.value;
      
      
      let sensor = this.sensors[sensorData.sensor];
      if (sensor !== undefined) {
        sensor.properties=sensorDataMap;
        sensor.details = sensorData;
       
        
      } else {
        
        /*sensor = new HudSensor();
        sensor.name = sensorData.sensor;
        sensor.details = sensorData;
        console.log("Creating sensor "+sensor.name);
        console.log(sensorDataMap.keys().length)
        for(let key of sensorDataMap.keys())
        {
          console.log(key);
        }*/

        
        //this.sensors.push(sensor);
      }
      
      //sensor.properties = sensor.details.value;
    });

    this.subscribed = true;
  }

  public unsubscribe() {
    if (!this.subscribed) {
      return;
    }

    this.updatesSubscription.unsubscribe();
    this.updatesSubscription = null;
    this.statusesSubscription.unsubscribe();
    this.statusesSubscription = null;
    this.detailsSubscription.unsubscribe();
    this.detailsSubscription = null;
    this.updates = null;
    this.statuses = null;
    this.details = null;

    this.subscribed = false;
  }

  public connect() {
    if (this._stompService.connected()) {
      return;
    }
    this._stompService.config = this.stompConfig;
    this._stompService.connectObservable.subscribe(x=>{
      this.subscribe();
    });
    this._stompService.initAndConnect();
  }

  public disconnect() {
    if (!this._stompService.connected()) {
      return;
    }
    this.unsubscribe();
    this._stompService.disconnect();
  }

  public isConnected() {
    return this.subscribed;
  }

  init() {
    this.subscribed = false;

    //this.subscribe();
  }

  // Callbacks
  ngOnDestroy() {
    this.disconnect();
  }

}
