import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleEditPagePageRoutingModule } from './article-edit-page-routing.module';

import { ArticleEditPagePage } from './article-edit-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleEditPagePageRoutingModule
  ],
  declarations: [ArticleEditPagePage]
})
export class ArticleEditPagePageModule {}
