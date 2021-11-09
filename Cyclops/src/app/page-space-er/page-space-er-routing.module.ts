import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSpaceErPage } from './page-space-er.page';

const routes: Routes = [
  {
    path: '',
    component: PageSpaceErPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSpaceErPageRoutingModule {}
