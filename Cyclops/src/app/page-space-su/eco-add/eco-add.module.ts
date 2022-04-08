import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcoAddPageRoutingModule } from './eco-add-routing.module';

import { EcoAddPage } from './eco-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcoAddPageRoutingModule
  ],
  declarations: [EcoAddPage]
})
export class EcoAddPageModule {}
