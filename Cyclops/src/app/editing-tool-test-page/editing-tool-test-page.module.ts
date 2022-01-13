import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditingToolTestPagePageRoutingModule } from './editing-tool-test-page-routing.module';

import { EditingToolTestPagePage } from './editing-tool-test-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditingToolTestPagePageRoutingModule
  ],
  declarations: [EditingToolTestPagePage]
})
export class EditingToolTestPagePageModule {}
