import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ArticleSearchPagePageRoutingModule } from './article-search-page-routing.module';

import { ArticleSearchPagePage } from './article-search-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    ArticleSearchPagePageRoutingModule
  ],
  declarations: [ArticleSearchPagePage]
})
export class ArticleSearchPagePageModule {}
