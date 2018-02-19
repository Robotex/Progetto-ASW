import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';
import { MatDialog } from '@angular/material';
import { HudDialogComponent, HUD_DIALOG_TYPE } from '../../hud-dialog/hud-dialog.component';
import { HUD_SENSORS_DETAIL_NAME } from '../../model/hud-sensors-detail-enum';
import { SpeechService } from '../../speech.service';
import { DEFAULT_DANGER_VOICE_MESSAGE } from '../../model/hud-voice';

@Component({
  selector: 'app-hud-proximity',
  templateUrl: './hud-proximity.component.html',
  styleUrls: ['./hud-proximity.component.css']
})
export class HudProximityComponent implements OnInit {

  value: number;
  warning_threshold: number;
  warning_threshold_triggered: boolean = false;
  private sensor_type="PROXIMITY";
  private sensorProperties:{[key:string]:any};

  constructor(private dataService: HudDataService,private speechService:SpeechService ,public dialog: MatDialog) { }

  getSensor(): void {
    this.dataService.getSensorObservable(this.sensor_type).subscribe(sensor=>{
      this.value = sensor.data.value;
      if (this.sensorProperties==null&&sensor.properties!=null&&sensor.properties!=undefined)
      {
        this.sensorProperties=sensor.properties;
        //this.min=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MIN_VALUE];
        //this.max=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MAX_VALUE];
        //this.delay=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.DELAY];
      }
      if (this.sensorProperties!=null)
      {
        this.warning_threshold = this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MAX_VALUE] * 0.10;

        if (this.value <= this.warning_threshold && !this.warning_threshold_triggered) {
          this.speechService.speakDefaultDangerMessage(DEFAULT_DANGER_VOICE_MESSAGE.SENSOR_PROXIMITY);
          this.dialog.open(HudDialogComponent, {
            data: {
              timeout: 2000,
              type: HUD_DIALOG_TYPE.WARNING,
              text: 'Ti stai avvicinando troppo!'
            }
          });
          this.warning_threshold_triggered = true;
        } else if (this.value > this.warning_threshold && this.warning_threshold_triggered) {
          this.warning_threshold_triggered = false;
        }
      }
    })
  }

  ngOnInit() {
    this.getSensor();
    this.speechService.init();
  }

}
