import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-camera',
  templateUrl: './hud-camera.component.html',
  styleUrls: ['./hud-camera.component.css']
})
export class HudCameraComponent implements OnInit {

  frame: string = "bm90IGFjdHVhbGx5IGEganBlZyBmaWxlCg==";

  constructor(private dataService: HudDataService) { }

  getSensor(): void {
    this.dataService.getSensor("CAMERA").subscribe(sensor => {
      this.frame = sensor.data.value;
    })
  }

  ngOnInit() {
    this.getSensor();
  }

}
