import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchAddEcoSolutionsPage } from './search-add-eco-solutions.page';

const routes: Routes = [
  {
    path: '',
    component: SearchAddEcoSolutionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchAddEcoSolutionsPageRoutingModule {}
