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
  maxSignal = 0;
  minSignal = 0;
  min_opacity:number=0.2;

  light:number;
  lightMax:number;

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
      {
        this.sensorProperties=sensor.properties;
        this.minSignal = this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MIN_VALUE];
        this.maxSignal = this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MAX_VALUE];

      }
      if (this.sensorProperties!=null)  
        this.updateCanvas();

      if (this.lightMax==0 && this.dataService.getSensorProperty("LIGHT",HUD_SENSORS_DETAIL_NAME.MAX_VALUE)!=undefined)
      {
          this.lightMax=this.dataService.getSensorProperty("LIGHT",HUD_SENSORS_DETAIL_NAME.MAX_VALUE);
      }

      let lightValue=this.dataService.getSensorLastDataRecorded("LIGHT");
        
      if (lightValue!=undefined && lightValue.value!=undefined && this.lightMax!=0)
      {
        this.light=(1-this.min_opacity)*(lightValue.value/this.lightMax);
      }
      
    })
    

    

  }

  changeStrokeColorOpacity(red:number,green:number,blue:number,opacity:number)
  {
    
    this.cx.strokeStyle="rgba("+red+","+green+","+blue+","+opacity.toFixed(2)+")";
    
  }

  rotateCanvas(angle:number)
  {
    let half_width=(this.width*this.scale)/2;
    let half_height=(this.height*this.scale)/2;
    this.cx.translate(half_width,half_height);
    this.cx.rotate(angle*Math.PI/180);
    this.cx.translate(-half_width,-half_height);
  }

  

  drawPositiveArrowsInside(value:number,max:number)
  {
    //small arrows
    
    let opacity:number=value<(max/2)?value/(max/2):1;
    this.changeStrokeColorOpacity(0,255,0,opacity);
    
    this.cx.beginPath();
    this.cx.moveTo(39*this.scale,47*this.scale);
    this.cx.lineTo(43*this.scale,51*this.scale);
    this.cx.lineTo(39*this.scale,55*this.scale);
    this.cx.stroke();
    this.cx.beginPath();
    this.cx.moveTo(63*this.scale,47*this.scale);
    this.cx.lineTo(59*this.scale,51*this.scale);
    this.cx.lineTo(63*this.scale,55*this.scale);
    this.cx.stroke();

    if (value>max/2)
    {
      //big arrows
      let half=max/2;
      opacity=(value-half)/(half);
      
      if (value==max)
      {
        this.changeStrokeColorOpacity(255,0,0,1);
      }
      else
      {
        this.changeStrokeColorOpacity(0,255,0,opacity);
      }
      this.cx.beginPath();
      this.cx.moveTo(43*this.scale,45*this.scale);
      this.cx.lineTo(49*this.scale,51*this.scale);
      this.cx.lineTo(43*this.scale,57*this.scale);
      this.cx.stroke();
      this.cx.beginPath();
      this.cx.moveTo(59*this.scale,45*this.scale);
      this.cx.lineTo(53*this.scale,51*this.scale);
      this.cx.lineTo(59*this.scale,57*this.scale);
      this.cx.stroke();
      
    }
    
  }

  drawNegativeArrowsInside(value:number,min:number)
  {
    
    //small arrows
    let opacity:number=value>(min/2)?value/(min/2):1;
    this.changeStrokeColorOpacity(0,255,0,opacity);
    this.cx.beginPath();
    this.cx.moveTo(49*this.scale,47*this.scale);
    this.cx.lineTo(45*this.scale,51*this.scale);
    this.cx.lineTo(49*this.scale,55*this.scale);
    this.cx.stroke();

    this.cx.beginPath();
    this.cx.moveTo(53*this.scale,47*this.scale);
    this.cx.lineTo(57*this.scale,51*this.scale);
    this.cx.lineTo(53*this.scale,55*this.scale);
    this.cx.stroke();
    

    if (value<min/2)
    {
      let half=min/2;
      opacity=(value-half)/(half);
      if (value==min)
      {
        this.changeStrokeColorOpacity(255,0,0,1);
      }
      else
      {
        this.changeStrokeColorOpacity(0,255,0,opacity);
      }
      //big arrows
      this.cx.beginPath();
      this.cx.moveTo(47*this.scale,43*this.scale);
      this.cx.lineTo(39*this.scale,51*this.scale);
      this.cx.lineTo(47*this.scale,59*this.scale);
      this.cx.stroke();

      this.cx.beginPath();
      this.cx.moveTo(55*this.scale,43*this.scale);
      this.cx.lineTo(63*this.scale,51*this.scale);
      this.cx.lineTo(55*this.scale,59*this.scale);
      this.cx.stroke();
      
    }
   }

  drawArrowsInside(value:number,max:number,min:number)
  {
    
    if (value>0) this.drawPositiveArrowsInside(value,max);
    else if (value<0) this.drawNegativeArrowsInside(value,min);
    
  }

  drawSmallArrowOutside(angle:number)
  {
    
    if (angle!=0)
    {
      this.rotateCanvas(angle);
    }
    
    this.cx.beginPath();
    this.cx.moveTo(35*this.scale,29*this.scale);
    this.cx.lineTo(51*this.scale,13*this.scale);
    this.cx.lineTo(67*this.scale,29*this.scale);
    this.cx.stroke();
    
    if (angle!=0)
    {
      this.rotateCanvas(-angle);
    }
  }

  drawBigArrowOutside(angle:number)
  {
    
    if (angle!=0)
      {this.rotateCanvas(angle);}
    this.cx.beginPath();
    this.cx.moveTo(27*this.scale,23*this.scale);
    this.cx.lineTo(51*this.scale,0*this.scale);
    this.cx.lineTo(75*this.scale,23*this.scale);
    this.cx.stroke();
    if (angle!=0)
      {this.rotateCanvas(-angle);}
    
  }


  drawOrthoArrows(value:number,max:number,min:number,angle:number)
  {
    //POSITIVE VALUES
    let small_opacity:number=0;
    let big_opacity:number=0;

    
    if (value==0) return;
    if (value>0)
    {
      let half=max/2;
      small_opacity=value<half?value/half:1;
      this.changeStrokeColorOpacity(0,255,0,small_opacity);
      this.drawSmallArrowOutside(angle);
      
      if (value>max/2)
      {
        
        big_opacity=(value-half)/half;
        
        
        if (value==max)
        {
          this.changeStrokeColorOpacity(255,0,0,1);
          this.drawBigArrowOutside(angle);
        }
        else
        {
          this.changeStrokeColorOpacity(0,255,0,big_opacity);
          this.drawBigArrowOutside(angle);
        }
        
      }
    }
    else
    {
      let half=min/2;
      //NEGATIVE VALUES
      let newAngle=360-(180-angle)
      small_opacity=value>half?value/half:1;
      this.changeStrokeColorOpacity(0,255,0,small_opacity);
      this.drawSmallArrowOutside(newAngle);
      

      if (value<half)
      {
        
        big_opacity=(value-half)/half;
        
        if (value==min)
        {
          this.changeStrokeColorOpacity(255,0,0,1);
          this.drawBigArrowOutside(newAngle,);
        }
        else
        {
          this.changeStrokeColorOpacity(0,255,0,big_opacity);
          this.drawBigArrowOutside(newAngle,);
        }
      
      }
    }
  }
  

  updateCanvas()
  { 
    this.cx.restore(); 
    this.cx.clearRect(0,0,this.width*this.scale,this.height*this.scale);
    this.cx.globalAlpha=this.min_opacity + this.light;
    this.drawArrowsInside(this.y,this.maxSignal,this.minSignal);
    this.drawOrthoArrows(this.x,this.maxSignal,this.minSignal,90);
    this.drawOrthoArrows(this.z,this.maxSignal,this.minSignal,0);

  }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    let canvasE1=this.myCanvas.nativeElement;
    this.cx=canvasE1.getContext('2d');
    canvasE1.width=this.width*this.scale;
    canvasE1.height=this.height*this.scale;
    this.cx.lineWidth=2*(this.scale/2);
    this.getSensor();
    
    
  }

}
