import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StompService, StompState } from '@stomp/ng2-stompjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-hud-status',
  templateUrl: './hud-status.component.html',
  styleUrls: ['./hud-status.component.css']
})
export class HudStatusComponent implements OnInit {


  public state: Observable<string>;

  constructor(private _stompService: StompService) { }

  ngOnInit() {
    this.state = this._stompService.state.map((state: number) => StompState[state]);
  }

}
