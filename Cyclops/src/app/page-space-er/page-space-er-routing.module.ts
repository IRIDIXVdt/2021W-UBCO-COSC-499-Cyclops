import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSpaceErPage } from './page-space-er.page';

const routes: Routes = [
  {
    path: '',
    component: PageSpaceErPage
  },  {
    path: 'welcome-message',
    loadChildren: () => import('./welcome-message/welcome-message.module').then( m => m.WelcomeMessagePageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSpaceErPageRoutingModule {}
