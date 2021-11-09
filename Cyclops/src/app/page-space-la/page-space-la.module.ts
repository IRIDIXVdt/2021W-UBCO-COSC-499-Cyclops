import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageSpaceLaPageRoutingModule } from './page-space-la-routing.module';

import { PageSpaceLaPage } from './page-space-la.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageSpaceLaPageRoutingModule
  ],
  declarations: [PageSpaceLaPage]
})
export class PageSpaceLaPageModule {}
