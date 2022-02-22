import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSurveyPage } from './edit-survey.page';

const routes: Routes = [
  {
    path: '',
    component: EditSurveyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSurveyPageRoutingModule {}
