import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HudDataService } from '../hud-data.service';
import {SpeechService} from '../speech.service';
import { HudSensor } from '../model/hud-sensor';
import { HUD_SENSORS_DETAIL_NAME } from '../model/hud-sensors-detail-enum';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

class HudMenuSensor {
  icon: string;
  name: string;
  status: string;
  delay: number;
}

@Component({
  selector: 'app-hud-menu',
  templateUrl: './hud-menu.component.html',
  styleUrls: ['./hud-menu.component.css']
})
export class HudMenuComponent implements OnInit, AfterViewInit  {

  
  public sensors: HudMenuSensor[] = [];
  icons: {
    [sensor: string]: string
  } = {
    "LIGHT": "lightbulb-on-outline",
    "GPS": "navigation",
    "BATTERY": "battery",
    "ACCELEROMETER": "run-fast",
    "CAMERA": "camera",
    "MAGNETIC": "magnet",
    "ORIENTATION": "cached",
    "PRESSURE": "weather-windy-variant",
    "PROXIMITY": "ruler",
    "TEMPERATURE": "oil-temperature"
  };

  private isOpen: boolean = false;
  private sensorsUpdater: Subscription;
  showSearchButton: boolean;
  speechData: string;
  voiceStarted=false;

  constructor(public dataService: HudDataService, private speechService:SpeechService) {
    
   }

  onMenuOpened(): void {
    let timer = TimerObservable.create(0, 1000);
    this.sensorsUpdater = timer.subscribe(t => {
      this.getSensors();
    });
    
  }

  voiceStart()
  {
    this.voiceStarted=true;
    this.activateSpeechSearchMovie();
  }
  voiceStop()
  {
    this.voiceStarted=false;
    
  }

  onMenuClosed(): void {
    this.sensorsUpdater.unsubscribe();
    this.sensorsUpdater = undefined;
  }

  getSensors(): void {
    let rawSensors = this.dataService.getAllSensors();
    this.sensors.length = 0;
    for (let s of rawSensors) {
      if (s.data === undefined)
        continue;
      let sensor=
      {
        name: s.details.sensor,
        icon: this.icons[s.details.sensor],
        status: (s.status === undefined ? "?" : s.status.value),
        delay: (s.data.timestamp -s.lastUpdate) - s.properties[HUD_SENSORS_DETAIL_NAME.DELAY]
                //(new Date()).getTime() - s.lastUpdate //- s.properties[HUD_SENSORS_DETAIL_NAME.DELAY]
      };
      this.sensors.push(sensor);
      if (s.properties[HUD_SENSORS_DETAIL_NAME.DELAY]!=undefined)
        console.log(s.details.sensor+": PROPRETY DETAIL DELAY:"+s.properties[HUD_SENSORS_DETAIL_NAME.DELAY]+ "REAL DELAY: "+sensor.delay);
    }
  }

  activateSpeechSearchMovie(): void {
    this.showSearchButton = false;
    
    this.speechService.record()
        .subscribe(
        //listener
        (value) => {
            this.speechData = value;
            if (this.speechData=="connect")
            {
              this.dataService.connect();
            }
            if (this.speechData =="disconnect")
            {
              this.dataService.disconnect();
            }
            console.log(value);
        },
        //errror
        (err) => {
            console.log(err);
            if (err.error == "no-speech") {
                console.log("--restatring service--");
                this.activateSpeechSearchMovie();
            }
        },
        //completion
        () => {
            this.showSearchButton = true;
            console.log("--complete--");
            //this.activateSpeechSearchMovie();
        });
}

  ngOnInit() {
    
  }

  activateMic()
  {
    
    
  }

  ngAfterViewInit(): void {
    
    
  }

  ngOnDestroy()
  {
    this.speechService.DestroySpeechObject();
  }

}
