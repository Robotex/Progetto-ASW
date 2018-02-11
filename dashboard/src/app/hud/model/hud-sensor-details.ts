import {HUD_SENSORS_DETAIL_NAME} from './hud-sensors-detail-enum';

export interface HudSensorDetails {
    generic: string;
    sensor: string;
    value: {[key: string]: any};
    timestamp: string;
}
