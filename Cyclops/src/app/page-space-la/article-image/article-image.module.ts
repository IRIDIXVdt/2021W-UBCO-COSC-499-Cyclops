import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleImagePageRoutingModule } from './article-image-routing.module';

import { ArticleImagePage } from './article-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleImagePageRoutingModule
  ],
  declarations: [ArticleImagePage]
})
export class ArticleImagePageModule {}
