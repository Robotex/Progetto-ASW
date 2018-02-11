import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-camera',
  templateUrl: './hud-camera.component.html',
  styleUrls: ['./hud-camera.component.css']
})
export class HudCameraComponent implements OnInit {


  frame: string = "bm90IGFjdHVhbGx5IGEganBlZyBmaWxlCg==";
<<<<<<< HEAD
  id: string= "cameraScreen";

  constructor(private dataService: HudDataService) {
    
   }
=======
  blob: Blob;
  src: SafeUrl;

  constructor(private dataService: HudDataService, private _sanitizer: DomSanitizer) { }
>>>>>>> f0c03b321e3d8ff3e030b7b012b66bd036b6d9d8

  getSensor(): void {
    this.dataService.getSensorObservable("CAMERA").subscribe(sensor => {
      this.frame = sensor.data.value;
      let url = "data:image/jpeg;base64," + this.frame;
      fetch(url)
      .then(res => res.blob())
      .then(blob => this.src = this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)));
    })
  }

  ngOnInit() {
    this.getSensor();

  }

}
