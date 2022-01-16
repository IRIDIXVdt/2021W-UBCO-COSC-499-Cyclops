import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CRUDDemoPage } from './crud-demo.page';

const routes: Routes = [
  {
    path: '',
    component: CRUDDemoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CRUDDemoPageRoutingModule {}
