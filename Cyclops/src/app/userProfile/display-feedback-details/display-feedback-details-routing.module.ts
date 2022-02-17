import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayFeedbackDetailsPage } from './display-feedback-details.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayFeedbackDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayFeedbackDetailsPageRoutingModule {}
