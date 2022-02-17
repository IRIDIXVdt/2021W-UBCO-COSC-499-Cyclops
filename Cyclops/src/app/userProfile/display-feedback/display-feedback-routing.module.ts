import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayFeedbackPage } from './display-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayFeedbackPageRoutingModule {}
