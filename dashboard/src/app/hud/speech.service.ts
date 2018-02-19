import { Injectable, NgZone } from '@angular/core';
import * as _ from "lodash"
import { Observable } from 'rxjs/Observable';
import {VoiceSettings, VOICE_TONE_PITCH, VOICE_LANG, VoiceMessage, DEFAULT_INFO_VOICE_MESSAGE, DEFAULT_WARNING_VOICE_MESSAGE, DEFAULT_DANGER_VOICE_MESSAGE,} from './model/hud-voice';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

interface IWindow extends Window{
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
  SpeechSynthesis: any;
  
}



@Injectable()
export class SpeechService {
    speakerObs:Observable<number>;
    audioSwitch:boolean;
    speechRecognition: any;
    speechSynthesis:any;
    voice:any;
    messagesToSay:VoiceMessage[]=[{message:"Sintetizzatore vocale attivo",
                                        type:VOICE_TONE_PITCH.INFO}];
    
  

    constructor(private zone: NgZone) { 
        
    }

    init()
    {
        if (this.speechSynthesis==undefined)
        {
            const {speechSynthesis}: IWindow=<IWindow>window;
            this.speechSynthesis=window.speechSynthesis;
            this.speechSynthesis.onresult= function(e)
            {
                console.log("Result of speech");
                console.log(e);
                
            }
            this.speechSynthesis.onend=function(e)
            {
                console.log("End of speech");
                console.log(e);
            }

            this.speaker();
        }
    }

    speaker()
    {
        this.speakerObs= TimerObservable.create(0, 1000);
        this.speakerObs.subscribe(t => {
            this.speak()
        });
    }

    speak()
    {
        if (!speechSynthesis.speaking && this.messagesToSay.length>0)
        {
            let message:VoiceMessage=this.messagesToSay.pop();
            console.log(message);
            console.log(this.messagesToSay);
            var msg=new SpeechSynthesisUtterance(message.message);
            msg.volume=1;
            msg.rate=message.type;
            msg.pitch=message.type;
            msg.lang=VOICE_LANG.ITALIAN;
            speechSynthesis.speak(msg);    
        }   
    }

    speakMessage(msg:string,speechTone:VOICE_TONE_PITCH)
    {
        console.log("New Message: "+ msg);
        if (this.messagesToSay.length==0 || this.messagesToSay.filter(f=>f.message==msg).length==0)
        {
            console.log("Adding message to queue");
            let message:VoiceMessage={message:msg,type:speechTone};
            this.messagesToSay.push(message);
            this.messagesToSay=this.messagesToSay.sort((a,b)=>{ return a.type<b.type?-1:1});
            //this.speak();
        }
    }

    speakDefaultInfoMessage(message:DEFAULT_INFO_VOICE_MESSAGE)
    {
        this.speakMessage(message,VOICE_TONE_PITCH.INFO);
    }

    speakDefaultWarningMessage(message:DEFAULT_WARNING_VOICE_MESSAGE)
    {
        this.speakMessage(message,VOICE_TONE_PITCH.WARNING);
    }

    speakDefaultDangerMessage(message:DEFAULT_DANGER_VOICE_MESSAGE)
    {
        this.speakMessage(message,VOICE_TONE_PITCH.DANGER);
    }

    

    record(): Observable<string> {

        return Observable.create(observer => {
            const { webkitSpeechRecognition }: IWindow = <IWindow>window;
            this.speechRecognition = new webkitSpeechRecognition();
            //this.speechRecognition = SpeechRecognition;
            this.speechRecognition.continuous = true;
            //this.speechRecognicd ..tion.interimResults = true;
            this.speechRecognition.lang = 'it-IT';
            this.speechRecognition.maxAlternatives = 1;
            
            this.speechRecognition.onresult = speech => {
                let term: string = "";
                if (speech.results) {
                    var result = speech.results[speech.resultIndex];
                    var transcript = result[0].transcript;
                    if (result.isFinal) {
                        if (result[0].confidence < 0.3) {
                            this.speakMessage("Parla chiaramente",VOICE_TONE_PITCH.INFO);
                            console.log("Unrecognized result - Please try again");
                        }
                        else {
                            term = _.trim(transcript);
                            console.log("Did you said? -> " + term + " , If not then say something else...");
                        }
                    }
                }
                this.zone.run(() => {
                    observer.next(term);
                });
            };

            this.speechRecognition.onerror = error => {
                observer.error(error);
            };

            this.speechRecognition.onend = () => {
                observer.complete();
            };

            this.speechRecognition.start();
            console.log("Say something - We are listening !!!");
        });
    }

    DestroySpeechObject() {
        if (this.speechRecognition)
            this.speechRecognition.stop();
    }

}
