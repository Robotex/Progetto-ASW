import { HudSensorData } from './hud-sensor-data';
import { HudSensorDetails } from './hud-sensor-details';
import { HudSensorStatus } from './hud-sensor-status';
import { Subject } from 'rxjs/Subject';

export class HudSensor {
    public name: string;
    public data: HudSensorData;
    public details: HudSensorDetails;
    public status: HudSensorStatus;
    public subject: Subject<HudSensor>;

    public properties: {[name: string]: any};

    constructor() {
        this.subject = new Subject();
    }
}