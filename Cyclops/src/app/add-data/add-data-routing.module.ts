import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDataPage } from './add-data.page';

const routes: Routes = [
  {
    path: '',
    component: AddDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDataPageRoutingModule {}
