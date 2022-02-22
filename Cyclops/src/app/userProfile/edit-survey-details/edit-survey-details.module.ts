import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSurveyDetailsPageRoutingModule } from './edit-survey-details-routing.module';

import { EditSurveyDetailsPage } from './edit-survey-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSurveyDetailsPageRoutingModule
  ],
  declarations: [EditSurveyDetailsPage]
})
export class EditSurveyDetailsPageModule {}
