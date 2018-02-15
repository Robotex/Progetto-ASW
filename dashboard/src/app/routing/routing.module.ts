import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { HudComponent } from '../hud/hud.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/hud', 
    pathMatch: 'full' 
  }, 
  {
    path: 'home',
    component: HomeComponent
  },
  { 
    path: 'hud', 
    loadChildren: 'app/hud/hud.module#HudModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule { }
