import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDataPageRoutingModule } from './add-data-routing.module';

import { AddDataPage } from './add-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDataPageRoutingModule
  ],
  declarations: [AddDataPage]
})
export class AddDataPageModule {}
