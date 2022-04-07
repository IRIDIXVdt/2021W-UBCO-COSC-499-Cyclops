import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcoAddPage } from './eco-add.page';

const routes: Routes = [
  {
    path: '',
    component: EcoAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcoAddPageRoutingModule {}
