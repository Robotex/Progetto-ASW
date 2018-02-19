export interface VoiceSettings {
    voice:SpeechSynthesisVoice;
    voiceURI:string;
    volume:number;
    rate:number;
    pitch:number;
    lang:string;
}

export enum VOICE_TONE_PITCH
{
    INFO=0.9,
    WARNING=1,
    DANGER=1.2
}

export enum VOICE_LANG
{
    ENGLISH="en-US",
    ITALIAN="it-IT"
}
export enum DEFAULT_INFO_VOICE_MESSAGE
{
    CONNECTED="Connesso!",
    CONNECTING="Mi sto connettendo!",
    DISCONNECTING="Mi sto disconnettendo!",
    DISCONNECTED="Disconnesso!",
    BATTERY_CHARGING="Batteria in carica",
    BATTERY_MEDIUM_CHARGE="Autonomia batteria ridotta",
    BATTERY_FULL_CHARGED="Batteria carica!"
}
export enum DEFAULT_WARNING_VOICE_MESSAGE
{
    SENSOR_CONNECTION_ERROR="Attenzione, errore di connessione",
    SENSOR_OVERHEATING="Attenzione, surriscaldamento!",
    SENSOR_LOW_BATTERY="Attenzione, batteria quasi scarica!",
    SENSOR_ACCELERATION_SHAKED="Attenzione, accelerazione instabile!",
    SENSOR_PITCH_ORIENTATION_HEADUP_WARNING="Tutto bene?",
    SENSOR_PITCH_ORIENTATION_HEADDOWN_WARNING="Tutto bene?",
    SENSOR_ROLL_ORIENTATION_HEADUP_WARNING="Attenzione, inclinazione testa inusuale! Ti senti bene?",
    SENSOR_LATENCY_HIGH="Attenzione, componente lento!",
    SENSOR_BROKEN="Attenzione, un componente ha smesso di funzionare"
}

export enum DEFAULT_DANGER_VOICE_MESSAGE
{
    SENSOR_BROKEN="Pericolo, un componente primario ha smesso di funzionare",
    SENSOR_PROXIMITY="Pericolo, impatto imminente!"
    
}

export interface VoiceMessage
{
    message:string;
    type:VOICE_TONE_PITCH;
}

