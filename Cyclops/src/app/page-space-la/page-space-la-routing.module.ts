import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSpaceLaPage } from './page-space-la.page';

const routes: Routes = [
  {
    path: '',
    component: PageSpaceLaPage
  },  {
    path: 'article-edit-page',
    loadChildren: () => import('./article-edit-page/article-edit-page.module').then( m => m.ArticleEditPagePageModule)
  },
  {
    path: 'article-image',
    loadChildren: () => import('./article-image/article-image.module').then( m => m.ArticleImagePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSpaceLaPageRoutingModule {}
