import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HudDataService } from '../../hud-data.service';
import { Observable } from 'rxjs/Observable';
import { HudSensor } from '../../model/hud-sensor';
import { HUD_SENSORS_DETAIL_NAME } from '../../model/hud-sensors-detail-enum';

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
  min: number = 0;
  private sensor_type="ACCELEROMETER";
  private cx: CanvasRenderingContext2D;
  private sensorProperties:{[key:string]:any};
  constructor(private dataService: HudDataService) { }

  getSensor(): void {
    
    
    this.dataService.getSensorObservable(this.sensor_type).subscribe(sensor => {
      this.x = sensor.data.value.x;
      this.y = sensor.data.value.y;
      this.z = sensor.data.value.z;
      if (this.sensorProperties==null&&sensor.properties!=null&&sensor.properties!=undefined)
        this.sensorProperties=sensor.properties;
      if (this.sensorProperties!=null)  
        this.updateCanvas();
      
      
    })
    

    

  }

  updateCanvas()
  {
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

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.getSensor();
    
  }

}
