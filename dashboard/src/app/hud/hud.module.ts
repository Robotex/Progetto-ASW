import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatListModule, MatSidenavModule,
  MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HudComponent } from '../hud/hud.component';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { routing } from './hud.routing';
import * as SockJS from 'sockjs-client';
import { HudStatusComponent } from './hud-status/hud-status.component';
import { HudMapComponent } from './hud-map/hud-map.component';

import { AgmCoreModule } from '@agm/core';

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
      //apiKey: 'YOUR_KEY'
    }),
    routing
  ],
  declarations: [HudComponent, HudStatusComponent, HudMapComponent],
  providers: [StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }]
})
export class HudModule { }
