import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleImagePage } from './article-image.page';

const routes: Routes = [
  {
    path: '',
    component: ArticleImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleImagePageRoutingModule {}
