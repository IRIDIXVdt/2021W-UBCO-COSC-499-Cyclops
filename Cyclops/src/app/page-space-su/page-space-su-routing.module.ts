import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSpaceSuPage } from './page-space-su.page';

const routes: Routes = [
  {
    path: '',
    component: PageSpaceSuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSpaceSuPageRoutingModule {}
