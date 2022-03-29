import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcoEditPage } from './eco-edit.page';

const routes: Routes = [
  {
    path: '',
    component: EcoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcoEditPageRoutingModule {}
