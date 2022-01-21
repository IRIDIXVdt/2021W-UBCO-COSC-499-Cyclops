import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // {
      //   path: 'tab1',
      //   loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      // },
      // {
      //   path: 'tab2',
      //   loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      // },
      // {
      //   path: 'tab3',
      //   loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      // },
      {
        path: 'page-space-er',
        loadChildren: () => import('../page-space-er/page-space-er.module').then(m => m.PageSpaceErPageModule)
      },
      {
        path: 'page-space-la',
        loadChildren: () => import('../page-space-la/page-space-la.module').then(m => m.PageSpaceLaPageModule)
      },
      {
        path: 'page-space-me',
        loadChildren: () => import('../page-space-me/page-space-me.module').then(m => m.PageSpaceMePageModule)
      },
      {
        path: 'page-space-su',
        loadChildren: () => import('../page-space-su/page-space-su.module').then(m => m.PageSpaceSuPageModule)
      },
      {
        path: 'TextEdit',
        loadChildren: () => import('../editing-tool-test-page/editing-tool-test-page.module').then(m => m.EditingToolTestPagePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/page-space-er',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/page-space-er',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
