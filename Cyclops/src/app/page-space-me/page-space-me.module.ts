import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { PopoverComponent } from '../popover/popover.component';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { IonicModule } from '@ionic/angular';

import { PageSpaceMePageRoutingModule } from './page-space-me-routing.module';

import { PageSpaceMePage } from './page-space-me.page';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageSpaceMePageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [PageSpaceMePage, PopoverComponent,EditModalComponent, FeedbackModalComponent ]
})
export class PageSpaceMePageModule { }
