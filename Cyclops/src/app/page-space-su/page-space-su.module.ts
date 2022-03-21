import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageSpaceSuPageRoutingModule } from './page-space-su-routing.module';

import { PageSpaceSuPage } from './page-space-su.page';
import { ScoreModalComponent } from './score-modal/score-modal.component';
import { SolutionPageForm } from './form/solution.page.form';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PageSpaceSuPageRoutingModule
    
  ],
  declarations: [PageSpaceSuPage,ScoreModalComponent]
})
export class PageSpaceSuPageModule {}
