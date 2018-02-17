import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HudDataService } from '../../hud-data.service';
import { HUD_SENSORS_DETAIL_NAME } from '../../model/hud-sensors-detail-enum';

@Component({
  selector: 'app-hud-camera',
  templateUrl: './hud-camera.component.html',
  styleUrls: ['./hud-camera.component.css']
})
export class HudCameraComponent implements OnInit {


  frame: string = "bm90IGFjdHVhbGx5IGEganBlZyBmaWxlCg==";
  id: string= "cameraScreen";
  image_width:number;
  image_height:number;
  
  blob: Blob;
  src: SafeUrl;

  constructor(private dataService: HudDataService, private _sanitizer: DomSanitizer) { }

  getSensor(): void {
    this.dataService.getSensorObservable("CAMERA").subscribe(sensor => {
      this.frame = sensor.data.value;
      let url = "data:image/jpeg;base64," + this.frame;
      fetch(url)
      .then(res => res.blob())
      .then(blob => this.src = this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)));

      if (sensor.properties[HUD_SENSORS_DETAIL_NAME.RESOLUTION]!=undefined && this.image_width==0 && this.image_height==0)
      {
        let resolution:string=sensor.properties[HUD_SENSORS_DETAIL_NAME.RESOLUTION];
        this.image_width=parseInt(resolution.substring(1,resolution.length-2).split('x')[0]);
        this.image_height=parseInt(resolution.substring(1,resolution.length-2).split('x')[1]);
      }
    })
  }

  ngOnInit() {
    this.getSensor();

  }

}
