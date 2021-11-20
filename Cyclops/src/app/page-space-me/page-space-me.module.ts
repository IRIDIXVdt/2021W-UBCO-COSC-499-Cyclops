import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopoverComponent } from '../popover/popover.component';

import { IonicModule } from '@ionic/angular';

import { PageSpaceMePageRoutingModule } from './page-space-me-routing.module';

import { PageSpaceMePage } from './page-space-me.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageSpaceMePageRoutingModule
  ],
  declarations: [PageSpaceMePage, PopoverComponent]
})
export class PageSpaceMePageModule { }
