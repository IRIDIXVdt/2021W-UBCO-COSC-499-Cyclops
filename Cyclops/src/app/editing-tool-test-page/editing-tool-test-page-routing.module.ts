import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditingToolTestPagePage } from './editing-tool-test-page.page';

const routes: Routes = [
  {
    path: '',
    component: EditingToolTestPagePage
  },  {
    path: 'search-add-eco-solutions',
    loadChildren: () => import('./search-add-eco-solutions/search-add-eco-solutions.module').then( m => m.SearchAddEcoSolutionsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditingToolTestPagePageRoutingModule {}
