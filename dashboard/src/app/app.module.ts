import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HudComponentComponent } from './hud-component/hud-component.component';
import { HudCardSpawnerComponentComponent } from './hud-card-spawner-component/hud-card-spawner-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HudComponentComponent,
    HudCardSpawnerComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
