import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSpaceLaPage } from './page-space-la.page';

const routes: Routes = [
  {
    path: '',
    component: PageSpaceLaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSpaceLaPageRoutingModule {}
