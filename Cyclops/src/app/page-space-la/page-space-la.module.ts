import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PageSpaceLaPageRoutingModule } from './page-space-la-routing.module';
import { PageSpaceLaPage } from './page-space-la.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ArticleMainComponent } from './article-main/article-main.component';
import { ArticleModalMainComponent } from './article-modal-main/article-modal-main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    PageSpaceLaPageRoutingModule
  ],
  declarations: [
    PageSpaceLaPage,
    ArticleMainComponent,
    ArticleModalMainComponent
  ]
})
export class PageSpaceLaPageModule {}
