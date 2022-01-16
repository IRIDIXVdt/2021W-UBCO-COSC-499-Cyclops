import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CRUDDemoPageRoutingModule } from './crud-demo-routing.module';

import { CRUDDemoPage } from './crud-demo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CRUDDemoPageRoutingModule
  ],
  declarations: [CRUDDemoPage]
})
export class CRUDDemoPageModule {}
