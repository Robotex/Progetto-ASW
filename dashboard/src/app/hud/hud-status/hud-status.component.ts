import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StompRService, StompState } from '@stomp/ng2-stompjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HudDialogComponent, HUD_DIALOG_TYPE } from '../hud-dialog/hud-dialog.component';
import 'rxjs/add/operator/map';
import { SpeechService } from '../speech.service';
import { DEFAULT_WARNING_VOICE_MESSAGE, DEFAULT_INFO_VOICE_MESSAGE } from '../model/hud-voice';

@Component({
  selector: 'app-hud-status',
  templateUrl: './hud-status.component.html',
  styleUrls: ['./hud-status.component.css']
})
export class HudStatusComponent implements OnInit {


  public state: Observable<string>;

  constructor(private _stompService: StompRService,private speechService:SpeechService ,public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.speechService.init();
    this.state = this._stompService.state.map((state: number) => StompState[state]);
    this._stompService.errorSubject.subscribe(err=>{
      this.speechService.speakDefaultWarningMessage(DEFAULT_WARNING_VOICE_MESSAGE.SENSOR_CONNECTION_ERROR);
      this.dialog.open(HudDialogComponent, {
        data: {
          type: HUD_DIALOG_TYPE.ERROR,
          text: 'Errore di connesione! [' + err + ']'
        }
      });
    });
    this._stompService.connectObservable.subscribe(x=>{
      this.speechService.speakDefaultInfoMessage(DEFAULT_INFO_VOICE_MESSAGE.CONNECTED);
      this.snackBar.open('Connessione avvenuta con successo!', '', {
        duration: 2000
      });
    });
  }

}
