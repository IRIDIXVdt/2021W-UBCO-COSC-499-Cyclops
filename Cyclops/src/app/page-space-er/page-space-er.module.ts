import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageSpaceErPageRoutingModule } from './page-space-er-routing.module';

import { PageSpaceErPage } from './page-space-er.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageSpaceErPageRoutingModule
  ],
  declarations: [PageSpaceErPage]
})
export class PageSpaceErPageModule {}
