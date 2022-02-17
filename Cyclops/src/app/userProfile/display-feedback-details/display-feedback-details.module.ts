import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayFeedbackDetailsPageRoutingModule } from './display-feedback-details-routing.module';

import { DisplayFeedbackDetailsPage } from './display-feedback-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayFeedbackDetailsPageRoutingModule
  ],
  declarations: [DisplayFeedbackDetailsPage]
})
export class DisplayFeedbackDetailsPageModule {}
