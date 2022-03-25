import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoringPagePageRoutingModule } from './scoring-page-routing.module';

import { ScoringPagePage } from './scoring-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ScoringPagePageRoutingModule
  ],
  declarations: [ScoringPagePage]
})
export class ScoringPagePageModule {}
