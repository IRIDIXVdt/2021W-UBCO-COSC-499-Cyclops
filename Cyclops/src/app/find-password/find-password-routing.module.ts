import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindPasswordPage } from './find-password.page';

const routes: Routes = [
  {
    path: '',
    component: FindPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindPasswordPageRoutingModule {}
