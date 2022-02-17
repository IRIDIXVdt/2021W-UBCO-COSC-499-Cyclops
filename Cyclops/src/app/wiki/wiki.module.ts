import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WikiPageRoutingModule } from './wiki-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { WikiPage } from './wiki.page';

@NgModule({
  imports: [
    CKEditorModule,
    CommonModule,
    FormsModule,
    IonicModule,
    WikiPageRoutingModule
  ],
  declarations: [WikiPage],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WikiPageModule { }
