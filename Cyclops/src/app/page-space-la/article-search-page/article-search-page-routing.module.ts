import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleSearchPagePage } from './article-search-page.page';

const routes: Routes = [
  {
    path: '',
    component: ArticleSearchPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleSearchPagePageRoutingModule {}
