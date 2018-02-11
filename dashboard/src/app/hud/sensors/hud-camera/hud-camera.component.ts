import { Component, OnInit } from '@angular/core';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-camera',
  templateUrl: './hud-camera.component.html',
  styleUrls: ['./hud-camera.component.css']
})
export class HudCameraComponent implements OnInit {


  frame: string = "bm90IGFjdHVhbGx5IGEganBlZyBmaWxlCg==";
  id: string= "cameraScreen";

  constructor(private dataService: HudDataService) {
    
   }

  getSensor(): void {
    this.dataService.getSensorObservable("CAMERA").subscribe(sensor => {
      this.frame = sensor.data.value;
    })
  }

  ngOnInit() {
    this.getSensor();

  }

}
