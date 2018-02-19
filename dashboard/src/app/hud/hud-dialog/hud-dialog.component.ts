import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'app-hud-dialog',
  templateUrl: './hud-dialog.component.html',
  styleUrls: ['./hud-dialog.component.css']
})
export class HudDialogComponent implements OnInit {

  public HUD_DIALOG_TYPE : any = HUD_DIALOG_TYPE;

  constructor(public dialogRef: MatDialogRef<HudDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data.timeout) {
      let timer = TimerObservable.create(this.data.timeout, 0);
      let subscription = timer.subscribe(t => {
        subscription.unsubscribe();
        this.closeDialog();
      });
    }
  }

}

export enum HUD_DIALOG_TYPE { DEFAULT, WARNING, ERROR }
