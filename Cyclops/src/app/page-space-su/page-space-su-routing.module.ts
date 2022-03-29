import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSpaceSuPage } from './page-space-su.page';

const routes: Routes = [
  {
    path: '',
    component: PageSpaceSuPage
  },  {
    path: 'eco-edit',
    loadChildren: () => import('./eco-edit/eco-edit.module').then( m => m.EcoEditPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSpaceSuPageRoutingModule {}
