import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HudDataService } from '../../hud-data.service';
import { HUD_SENSORS_DETAIL_NAME } from '../../model/hud-sensors-detail-enum';

@Component({
  selector: 'app-hud-orientation',
  templateUrl: './hud-orientation.component.html',
  styleUrls: ['./hud-orientation.component.css']
})
export class HudOrientationComponent implements OnInit, AfterViewInit {
  @ViewChild("orientationCanvas") myCanvas:ElementRef;
  pitch:number=0;
  yaw:number=0;
  roll:number=0;

  min:number=0;
  max:number=0;
  delay:number=0;
  min_opacity:number=0.2;

  private width:number=102;
  private height:number=102;
  private scale:number=2;
  
  private sensor_type="ORIENTATION";
  private cx: CanvasRenderingContext2D;
  private sensorProperties:{[key:string]:any};

  constructor(private dataService: HudDataService) { }

  getSensor(): void {
    this.dataService.getSensorObservable(this.sensor_type).subscribe(sensor=>{
      let vector=sensor.data.value;
      this.pitch=vector.x*90;
      this.roll=vector.y*180;
      this.yaw=180+vector.z*180;
      if (this.sensorProperties==null&&sensor.properties!=null&&sensor.properties!=undefined)
      {
        this.sensorProperties=sensor.properties;
        this.min=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MIN_VALUE];
        this.max=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.MAX_VALUE];
        this.delay=this.sensorProperties[HUD_SENSORS_DETAIL_NAME.DELAY];
      }
      if (this.sensorProperties!=null)
      {
        this.updateCanvas();
      }
    })
  }

  drawReticle(angle:number)
  {
    let halfX,halfY;
    halfX=this.width/2;
    halfY=this.height/2;
    this.cx.translate(halfX,halfY);
    this.cx.rotate(angle*Math.PI/180);
    this.cx.translate(-halfX,-halfY);

    this.cx.arc(halfX,halfY,16*this.scale,0,2*Math.PI)
    this.cx.beginPath();
    this.cx.moveTo(35*this.scale,51*this.scale);
    this.cx.lineTo(27*this.scale,51*this.scale);
    
    this.cx.beginPath();
    this.cx.moveTo(51*this.scale,35*this.scale);
    this.cx.lineTo(51*this.scale,27*this.scale);
    
    this.cx.beginPath();
    this.cx.moveTo(67*this.scale,51*this.scale);
    this.cx.lineTo(75*this.scale,51*this.scale);
    this.cx.stroke();

    this.cx.restore();

  }

  updateCanvas()
  {
    let light=this.dataService.getSensorLastDataRecorded("LIGHT").value;
    let lightMax:number=this.dataService.getSensorProperty("LIGHT",HUD_SENSORS_DETAIL_NAME.MAX_VALUE);
    if (light!=undefined&&lightMax!=undefined)
    {
      this.cx.globalAlpha=this.min_opacity+((light*0.8)/lightMax);
    }
    else
      this.cx.globalAlpha=1;
    
    this.drawReticle(this.roll);
  }

  ngOnInit() {
    this.getSensor();
  }

  ngAfterViewInit(): void {
    let canvasE1=this.myCanvas.nativeElement;
    this.cx=canvasE1.getContext("2d");
    canvasE1.width=this.width*this.scale;
    canvasE1.height=this.height*this.scale;
    this.cx.lineWidth=2*(this.scale/2);
    
    this.cx.strokeStyle="rgba(0,255,0,1)";
    this.getSensor();
  }

}
