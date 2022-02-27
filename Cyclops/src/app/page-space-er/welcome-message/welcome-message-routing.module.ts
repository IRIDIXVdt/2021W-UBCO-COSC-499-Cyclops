import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeMessagePage } from './welcome-message.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeMessagePageRoutingModule {}
