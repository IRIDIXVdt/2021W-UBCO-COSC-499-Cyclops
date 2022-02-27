import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleEditPagePage } from './article-edit-page.page';

const routes: Routes = [
  {
    path: '',
    component: ArticleEditPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleEditPagePageRoutingModule {}
