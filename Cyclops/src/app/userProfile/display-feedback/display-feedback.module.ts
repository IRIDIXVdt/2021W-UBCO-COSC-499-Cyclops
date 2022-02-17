import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayFeedbackPageRoutingModule } from './display-feedback-routing.module';

import { DisplayFeedbackPage } from './display-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayFeedbackPageRoutingModule
  ],
  declarations: [DisplayFeedbackPage]
})
export class DisplayFeedbackPageModule {}
