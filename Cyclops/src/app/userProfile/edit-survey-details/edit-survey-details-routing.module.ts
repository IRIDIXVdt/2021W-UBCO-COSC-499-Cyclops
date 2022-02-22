import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSurveyDetailsPage } from './edit-survey-details.page';

const routes: Routes = [
  {
    path: '',
    component: EditSurveyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSurveyDetailsPageRoutingModule {}
