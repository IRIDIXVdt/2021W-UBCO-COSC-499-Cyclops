import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomeMessagePageRoutingModule } from './welcome-message-routing.module';

import { WelcomeMessagePage } from './welcome-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomeMessagePageRoutingModule
  ],
  declarations: [WelcomeMessagePage]
})
export class WelcomeMessagePageModule {}
