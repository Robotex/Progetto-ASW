import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatListModule, MatSidenavModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HudComponent } from '../hud/hud.component';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { routing } from './hud.routing';
import * as SockJS from 'sockjs-client';
import { HudStatusComponent } from './hud-status/hud-status.component';
import { HudMapComponent } from './sensors/hud-map/hud-map.component';

import { AgmCoreModule } from '@agm/core';
import { HudBatteryComponent } from './sensors/hud-battery/hud-battery.component';
import { HudTemperatureComponent } from './sensors/hud-temperature/hud-temperature.component';
import { HudPressureComponent } from './sensors/hud-pressure/hud-pressure.component';
import { HudLightComponent } from './sensors/hud-light/hud-light.component';
import { HudProximityComponent } from './sensors/hud-proximity/hud-proximity.component';
import { HudMagneticComponent } from './sensors/hud-magnetic/hud-magnetic.component';
import { HudGyroscopeComponent } from './sensors/hud-gyroscope/hud-gyroscope.component';
import { HudCameraComponent } from './sensors/hud-camera/hud-camera.component';
import { HudDataService } from './hud-data.service';
import { HudAccelerometerComponent } from './sensors/hud-accelerometer/hud-accelerometer.component';

export function socketProvider() {
  return new SockJS('http://piagatech.ddns.net:8090/greetings');
}

const stompConfig: StompConfig = {
  // Which server?
  url: socketProvider,

  // Headers
  // Typical keys: login, passcode, host
  headers: {
    // login: 'guest',
    // passcode: 'guest'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: true
};


@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonModule, 
    MatCardModule, 
    MatGridListModule, 
    MatIconModule, 
    MatListModule, 
    MatSidenavModule,
    MatTooltipModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBXkaigCdSAS0Ji-hblkd6AfzDxbq_XIZo'
    }),
    routing
  ],
  declarations: [HudComponent, HudStatusComponent, HudMapComponent, HudBatteryComponent, HudTemperatureComponent, HudPressureComponent, HudLightComponent, HudProximityComponent, HudMagneticComponent, HudGyroscopeComponent, HudCameraComponent, HudAccelerometerComponent],
  providers: [StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }, HudDataService]
})
export class HudModule { }
