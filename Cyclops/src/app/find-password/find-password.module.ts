import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindPasswordPageRoutingModule } from './find-password-routing.module';

import { FindPasswordPage } from './find-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindPasswordPageRoutingModule
  ],
  declarations: [FindPasswordPage]
})
export class FindPasswordPageModule {}
