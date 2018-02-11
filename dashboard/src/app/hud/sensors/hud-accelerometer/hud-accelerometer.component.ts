import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HudDataService } from '../../hud-data.service';

@Component({
  selector: 'app-hud-accelerometer',
  templateUrl: './hud-accelerometer.component.html',
  styleUrls: ['./hud-accelerometer.component.css']
})
export class HudAccelerometerComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') public canvas:ElementRef;
  
  x: number = 0;  
  y: number = 0;
  z: number = 0;

  private cx: CanvasRenderingContext2D;

  constructor(private dataService: HudDataService) { }

  getSensor(): void {
    this.dataService.getSensor("ACCELEROMETER").subscribe(sensor => {
      this.x = sensor.data.value.x;
      this.y = sensor.data.value.y;
      this.z = sensor.data.value.z;
    })
  }

  updateCanvas()
  {
    
  }

  ngOnInit() {
    this.getSensor();
  }

  ngAfterViewInit(): void {
    
    const canvasE1: HTMLCanvasElement =this.canvas.nativeElement;
    this.cx=canvasE1.getContext('2d');

    canvasE1.width=51;
    canvasE1.height=51;
    this.cx.lineWidth=2;
    this.cx.lineCap='round';
    this.cx.strokeStyle = '#0f0';
    this.cx.moveTo(17,15);
    this.cx.lineTo(25,7);
    this.cx.lineTo(33,15);
  }

}
