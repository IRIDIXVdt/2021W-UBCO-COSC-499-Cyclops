import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditingToolTestPagePage } from './editing-tool-test-page.page';

const routes: Routes = [
  {
    path: '',
    component: EditingToolTestPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditingToolTestPagePageRoutingModule {}
