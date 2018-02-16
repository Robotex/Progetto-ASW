import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StompRService, StompState } from '@stomp/ng2-stompjs';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-hud-status',
  templateUrl: './hud-status.component.html',
  styleUrls: ['./hud-status.component.css']
})
export class HudStatusComponent implements OnInit {


  public state: Observable<string>;

  constructor(private _stompService: StompRService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.state = this._stompService.state.map((state: number) => StompState[state]);
    this._stompService.errorSubject.subscribe(err=>{
      alert('Errore di connesione! [' + err + ']');
    });
    this._stompService.connectObservable.subscribe(x=>{
      this.snackBar.open('Connessione avvenuta con successo!', '', {
        duration: 2000
      });
    });
  }

}
