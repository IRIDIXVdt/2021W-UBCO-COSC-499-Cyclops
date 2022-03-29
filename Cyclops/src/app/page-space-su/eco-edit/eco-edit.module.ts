import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcoEditPageRoutingModule } from './eco-edit-routing.module';

import { EcoEditPage } from './eco-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcoEditPageRoutingModule
  ],
  declarations: [EcoEditPage]
})
export class EcoEditPageModule {}
