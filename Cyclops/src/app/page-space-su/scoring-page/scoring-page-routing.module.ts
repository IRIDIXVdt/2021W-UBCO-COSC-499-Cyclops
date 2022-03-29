import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoringPagePage } from './scoring-page.page';

const routes: Routes = [
  {
    path: '',
    component: ScoringPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoringPagePageRoutingModule {}
