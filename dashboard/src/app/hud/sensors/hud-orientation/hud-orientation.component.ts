import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HudDataService } from '../../hud-data.service';
import { HUD_SENSORS_DETAIL_NAME } from '../../model/hud-sensors-detail-enum';

@Component({
  selector: 'app-hud-orientation',
  templateUrl: './hud-orientation.component.html',
  styleUrls: ['./hud-orientation.component.css']
})
export class HudOrientationComponent implements OnInit, AfterViewInit {
  @ViewChild("orientationRollCanvas") rollCanvas:ElementRef;
  @ViewChild("orientationPitchCanvasLeft") pitchCanvasLeft:ElementRef;
  @ViewChild("orientationPitchCanvasRight") pitchCanvasRight:ElementRef;
  @ViewChild("orientationYawCanvas") yawCanvas:ElementRef;
  @ViewChild("samplePitchCanvas") sPitchCanvas:ElementRef;
  @ViewChild("sampleYawCanvas") sYawCanvas:ElementRef;
  
  pitch:number=0;
  yaw:number=360;
  roll:number=0;

  min:number=0;
  max:number=0;
  delay:number=0;
  min_opacity:number=0.2;

  private roll_width:number=102;
  private roll_height:number=102;
  private pitch_width:number=50;
  private pitch_height:number=180;
  private yaw_height:number=50;
  private scale:number=2;
  private pitch_zoom:number=8;
  private yaw_zoom:number=4;
  
  private sensor_type="ORIENTATION";
  private rollCx: CanvasRenderingContext2D;
  private pitchRightCx:CanvasRenderingContext2D;
  private pitchLeftCx:CanvasRenderingContext2D;
  private yawCx:CanvasRenderingContext2D;
  private sPitchCx:CanvasRenderingContext2D;
  private sYawCx:CanvasRenderingContext2D;
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
        this.updateRollCanvas();
        this.updatePitchCanvas();
        this.updateYawCanvas();
      }
    })
  }

  rotateCanvas(canvas:CanvasRenderingContext2D, angle:number,canvasWidth:number,canvasHeight:number)
  {
    let halfX=canvasWidth*this.scale/2,halfY=canvasHeight*this.scale/2;

    canvas.translate(halfX,halfY);
    canvas.rotate(angle*Math.PI/180);
    canvas.translate(-halfX,-halfY);
  }

  drawReticle(angle:number)
  {
    let halfX,halfY;
    halfX=this.roll_width/2;
    halfY=this.roll_height/2;
    this.rotateCanvas(this.rollCx,angle,this.roll_width,this.roll_height);

    this.rollCx.arc(halfX*this.scale,halfY*this.scale,16*this.scale,0,2*Math.PI);
    this.rollCx.stroke();


    this.rollCx.beginPath();
    this.rollCx.moveTo(35*this.scale,51*this.scale);
    this.rollCx.lineTo(27*this.scale,51*this.scale);
    this.rollCx.stroke();
    
    this.rollCx.beginPath();
    this.rollCx.moveTo(51*this.scale,35*this.scale);
    this.rollCx.lineTo(51*this.scale,27*this.scale);
    this.rollCx.stroke();
    this.rollCx.beginPath();
    this.rollCx.moveTo(67*this.scale,51*this.scale);
    this.rollCx.lineTo(75*this.scale,51*this.scale);
    this.rollCx.stroke();

    this.rotateCanvas(this.rollCx,-angle,this.roll_width,this.roll_height);

  }

  updateRollCanvas()
  {
    this.rollCx.restore();
    this.rollCx.clearRect(0,0,this.roll_width*this.scale,this.roll_height*this.scale);
    let light=this.dataService.getSensorLastDataRecorded("LIGHT").value;
    let lightMax:number=this.dataService.getSensorProperty("LIGHT",HUD_SENSORS_DETAIL_NAME.MAX_VALUE);
    if (light!=undefined&&lightMax!=undefined)
    {
      this.rollCx.globalAlpha=this.min_opacity+((light*0.8)/lightMax);
    }
    else
      this.rollCx.globalAlpha=1;
    
    this.drawReticle(this.roll);
  }

  copyPitchSampleToCanvas(pitchCx:CanvasRenderingContext2D,rotate?:boolean)
  {
      pitchCx.clearRect(0,0,this.pitch_width*this.scale,this.pitch_height*this.scale);
      let pattern=pitchCx.createPattern(this.sPitchCanvas.nativeElement,"repeat-y");
      pitchCx.rect(0,0,this.pitch_width*this.scale,this.pitch_height*this.scale);
      pitchCx.fillStyle=pattern;
      let yTranslation=this.pitch_height*(this.scale*this.pitch_zoom-this.scale)/2;
      let yPitch=this.pitch*this.pitch_zoom;
      
      if (rotate)
        this.rotateCanvas(pitchCx,180,this.pitch_width*this.scale,this.pitch_height*this.scale);  
      pitchCx.translate(0,-(yTranslation- yPitch));
      pitchCx.fill();
      pitchCx.translate(0,(yTranslation- yPitch));
      if (rotate)
        this.rotateCanvas(pitchCx,-180,this.pitch_width*this.scale,this.pitch_height*this.scale);  
      
      
  }

  copyYawSampleToCanvas()
  {
    let cx=this.yawCx;
    let pattern=cx.createPattern(this.sYawCanvas.nativeElement,"repeat-x");
    cx.rect(0,0,this.roll_width*this.scale,this.yaw_height*this.scale);
    cx.fillStyle=pattern;
    let xTranslation=this.roll_width*this.scale*6;//this.roll_width*this.scale/3;
    let xYaw=this.roll_width*this.scale/2
            -this.yaw*(this.roll_width*this.yaw_zoom/360);
    console.log("yaw: "+this.yaw+" xYaw:" +xYaw);

    cx.translate(-xYaw,0);
    cx.fill();
    cx.translate(xYaw,0);
  }

  updatePitchCanvas()
  {
    
    
    this.copyPitchSampleToCanvas(this.pitchLeftCx,false);
false  
    this.copyPitchSampleToCanvas(this.pitchRightCx,false);
    
  }

  updateYawCanvas()
  {
    this.yawCx.clearRect(0,0,this.roll_width*this.scale,this.yaw_height*this.scale);
    let width=(this.roll_width*this.scale);
    let y1=10*this.scale;    
    this.yawCx.beginPath();
    this.yawCx.moveTo(width/2-5,y1-8);
    this.yawCx.lineTo(width/2,y1);
    this.yawCx.lineTo(width/2+5,y1-8);
    this.yawCx.stroke();
    this.copyYawSampleToCanvas();
  }

  ngOnInit() {
    this.getSensor();
  }

  getContextFromElement(element:ElementRef)
  {
    return element.nativeElement.getContext("2d");
  }

  

  drawPitchBigRow(stepHeight:number,iteration:number)
  {
    let y:number=stepHeight*iteration;
    let numberToPrint=0;
    if (iteration<9)
      numberToPrint=y/(this.pitch_zoom/2);
    else if (iteration<=27)
      numberToPrint=180-(y/(this.pitch_zoom/2));
    else if (iteration>27)
      numberToPrint=-360+y/(this.pitch_zoom/2);
    
    this.sPitchCx.beginPath()
    let x1,x2,x3,x4;
    x1=0;
    x2=this.pitch_width*0.3*this.scale;
    x3=this.pitch_width*0.7*this.scale;
    x4=this.pitch_width*this.scale;
    
    this.sPitchCx.moveTo(x1,y*this.scale);
    this.sPitchCx.lineTo(x2,y*this.scale);
    this.sPitchCx.stroke();
    this.sPitchCx.moveTo(x3,y*this.scale);
    this.sPitchCx.lineTo(x4,y*this.scale);
    this.sPitchCx.stroke();
    
    this.sPitchCx.strokeText(numberToPrint+"",x2+(10-4*numberToPrint.toString().length)*this.scale,
                y*this.scale);
    
  }

  initPitchSample()
  {
    let step=(this.pitch_height*this.pitch_zoom)/36;
    for(let index=0; index<=36; index++)
      this.drawPitchBigRow(step,index);
  }

  initYawSample()
  {
    

    let width=(this.roll_width*this.yaw_zoom*this.scale);
    let step=width/24;
    let y1=10*this.scale;
    let y2=20*this.scale;
    let y3=15*this.scale;
    //drawing base line
    this.sYawCx.beginPath();
    this.sYawCx.moveTo(0,y1);
    this.sYawCx.lineTo(width,y1);
    this.sYawCx.stroke();
    
    this.sYawCx.stroke();
    for(let index=0; index<=24;index++)
    {
      let x=index*step;
      if (index==0||index%3==0)
      {
        //draw compass big lines
        
        this.sYawCx.beginPath();
        this.sYawCx.moveTo(x,y1);
        this.sYawCx.lineTo(x,y2);
        this.sYawCx.stroke();
        let char= index==0 || index % 12 == 0 ? 'N':
                  index == 3 || index == 15 ? 'E':
                  index == 6 || index == 18 ? 'S': 'W';
        this.sYawCx.strokeText(char,x-5,y2+15);
      }
      else
      {
        //draw compass small lines
        this.sYawCx.beginPath();
        this.sYawCx.moveTo(x,y1);
        this.sYawCx.lineTo(x,y3);
        this.sYawCx.stroke();
      }
    }

  }

  

  initPitchContext()
  {
    //sample canvas
    
    this.sPitchCx=this.getContextFromElement(this.sPitchCanvas);
    this.sPitchCanvas.nativeElement.width=this.pitch_width*this.scale*this.pitch_zoom;
    this.sPitchCanvas.nativeElement.height=this.pitch_height*this.scale*this.pitch_zoom;
    this.sPitchCx.lineWidth=1*(this.scale/2);
    this.sPitchCx.strokeStyle="rgba(0,255,0,1)";
    this.sPitchCx.font="lighter "+15+"pt Courier New";
    this.initPitchSample();
    console.info("sample pitch canvas loaded");

    console.debug("loading pitch context");
    console.debug(this.pitchCanvasLeft.nativeElement);
    this.pitchLeftCx=this.getContextFromElement(this.pitchCanvasLeft);
    this.pitchCanvasLeft.nativeElement.width=this.pitch_width*this.scale;
    this.pitchCanvasLeft.nativeElement.height=this.pitch_height*this.scale;
    this.pitchLeftCx.lineWidth=2*(this.scale/2);
    this.pitchLeftCx.strokeStyle="rgba(0,255,0,1)";

    this.pitchRightCx=this.getContextFromElement(this.pitchCanvasRight);
    this.pitchCanvasRight.nativeElement.width=this.pitch_width*this.scale;
    this.pitchCanvasRight.nativeElement.height=this.pitch_height*this.scale;
    this.pitchRightCx.lineWidth=2*(this.scale/2);
    this.pitchRightCx.strokeStyle="rgba(0,255,0,1)";
    this.updatePitchCanvas();
    console.info("pitch canvas loaded");
  }

  

  initRollContext()
  {
    this.rollCx=this.getContextFromElement(this.rollCanvas);
    this.rollCanvas.nativeElement.width=this.roll_width*this.scale;
    this.rollCanvas.nativeElement.height=this.roll_height*this.scale;
    this.rollCx.lineWidth=2*(this.scale/2);
    this.rollCx.strokeStyle="rgba(0,255,0,1)";
  }

  initYawContext()
  {
    //sampleCanvas
  this.sYawCx=this.getContextFromElement(this.sYawCanvas);
  this.sYawCanvas.nativeElement.width=this.roll_width*this.scale*this.yaw_zoom;
  this.sYawCanvas.nativeElement.height=this.yaw_height*this.scale;
  this.sYawCx.lineWidth=2*(this.scale/2);
  this.sYawCx.strokeStyle="rgba(0,255,0,1)";
  this.sYawCx.font="lighter "+14+"pt Courier New";
  this.initYawSample();

    //canvas
  this.yawCx=this.getContextFromElement(this.yawCanvas);
  this.yawCanvas.nativeElement.width=this.roll_width*this.scale;
  this.yawCanvas.nativeElement.height=this.yaw_height*this.scale;
  this.yawCx.lineWidth=2*(this.scale/2);
  this.yawCx.strokeStyle="rgba(0,255,0,1)";

  this.updateYawCanvas();

    
  }

  ngAfterViewInit(): void {
    this.initRollContext();
    this.initPitchContext();
    this.initYawContext();
    this.getSensor();
  }

}
