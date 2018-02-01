import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HudComponent } from './hud.component';

const routes: Routes = [
    { path: '', component: HudComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);