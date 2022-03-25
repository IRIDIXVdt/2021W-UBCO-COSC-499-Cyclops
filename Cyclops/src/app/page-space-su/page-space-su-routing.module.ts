import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSpaceSuPage } from './page-space-su.page';

const routes: Routes = [
  {
    path: '',
    component: PageSpaceSuPage
  },  {
    path: 'scoring-page',
    loadChildren: () => import('./scoring-page/scoring-page.module').then( m => m.ScoringPagePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSpaceSuPageRoutingModule {}
