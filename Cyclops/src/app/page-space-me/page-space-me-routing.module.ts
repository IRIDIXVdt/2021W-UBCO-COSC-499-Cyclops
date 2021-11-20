import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSpaceMePage } from './page-space-me.page';

const routes: Routes = [
  {
    path: '',
    component: PageSpaceMePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSpaceMePageRoutingModule {}
