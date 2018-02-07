import { HudSensorData } from './hud-sensor-data';
import { HudSensorDetails } from './hud-sensor-details';
import { Subject } from 'rxjs/Subject';

export class HudSensor {
    public name: string;
    public data: HudSensorData;
    public details: HudSensorDetails;
    public subject: Subject<HudSensor>;

    constructor() {
        this.subject = new Subject();
    }
}