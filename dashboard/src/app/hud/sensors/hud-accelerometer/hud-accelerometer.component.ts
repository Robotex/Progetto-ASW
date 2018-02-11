import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
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

  @ViewChild("accCanvas") myCanvas:ElementRef;
  
  x: number = 0;  
  y: number = 0;
  z: number = 0;
  min: number = 0;
  opacityX:number=0;
  opacityY:number=0;
  opacityZ:number=0;

  width:number = 102;
  height:number=102;
  scale:number=2;
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

  rotateCanvas(angle:number)
  {
    let half_width=(this.width*this.scale)/2;
    let half_height=(this.height*this.scale)/2;
    this.cx.translate(half_width,half_height);
    this.cx.rotate(angle*Math.PI/180);
    this.cx.translate(-half_width,-half_height);
  }

  drawSmallArrow(angle:number,strokeStyle:string)
  {
    this.cx.strokeStyle=strokeStyle;
    if (angle!=0)
    {
      this.rotateCanvas(angle);
    }

    this.cx.moveTo(34*this.scale,30*this.scale);
    this.cx.lineTo(50*this.scale,14*this.scale);
    this.cx.lineTo(66*this.scale,30*this.scale);
    this.cx.stroke();
    if (angle!=0)
    {
      this.rotateCanvas(-angle);
    }
    this.cx.strokeStyle="#000000";
  }

  drawBigArrow(angle:number,strokeStyle:string)
  {
    this.cx.strokeStyle=strokeStyle;
    if (angle!=0)
      this.rotateCanvas(angle);
    
    this.cx.moveTo(26*this.scale,24*this.scale);
    this.cx.lineTo(50*this.scale,0*this.scale);
    this.cx.lineTo(74*this.scale,24*this.scale);

    this.cx.stroke();
    if (angle!=0)
      this.rotateCanvas(-angle);
    this.cx.strokeStyle="#000000";
  }


  drawOrthoArrows(value:number,max:number,min:number,angle:number)
  {
    //POSITIVE VALUES
    let opacity:number=0;


    if (value==0) return;
    if (value>0)
    {
      opacity=value<(max/2)?value/(max/2):1;
      
      this.drawSmallArrow(angle,"rgba(0,255,0,"+opacity+")");
      if (value>max/2)
      {
        opacity=(value-max/2)/(max/2);
        if (value==max)
          this.drawBigArrow(angle,"rgba(255,0,0,1)");
        else
          this.drawBigArrow(angle,"rgba(0,255,0,"+opacity+")");

      }
    }
    else
    {
      //NEGATIVE VALUES
      let newAngle=360-(180-angle)
      opacity=value>(min/2)?value/(min/2):1;
      
      this.drawSmallArrow(newAngle,"rgba(0,255,0,"+opacity+")");
      if (value<min/2)
      {
        opacity=(value-min/2)/(min/2);
        if (value==min)
          this.drawBigArrow(newAngle,"rgba(255,0,0,1)");
        else
          this.drawBigArrow(newAngle,"rgba(0,255,0,"+opacity+")");

      }
    }
  }
  

  updateCanvas()
  {
    //console.log(this.myCanvas);
    let canvasE1=this.myCanvas.nativeElement;
    this.cx=canvasE1.getContext('2d');

    canvasE1.width=this.width*this.scale;
    canvasE1.height=this.height*this.scale;
    this.cx.fillRect(0,0,102*this.scale,102*this.scale);
    this.cx.lineWidth=2;
    
    let maxSignal=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MAX_VALUE];
    let minSignal=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MIN_VALUE];
    
    this.drawOrthoArrows(this.z,maxSignal,minSignal,0);
    this.drawOrthoArrows(this.x,maxSignal,minSignal,90);


  }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {

    this.getSensor();
    
  }

}
