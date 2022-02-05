import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'page-space-la',
    loadChildren: () => import('./page-space-la/page-space-la.module').then( m => m.PageSpaceLaPageModule)
  },
  {
    path: 'page-space-er',
    loadChildren: () => import('./page-space-er/page-space-er.module').then( m => m.PageSpaceErPageModule)
  },
  {
    path: 'page-space-su',
    loadChildren: () => import('./page-space-su/page-space-su.module').then( m => m.PageSpaceSuPageModule)
  },
  {
    path: 'page-space-me',
    loadChildren: () => import('./page-space-me/page-space-me.module').then( m => m.PageSpaceMePageModule)
  },
  {
    path: 'tabs/page-space-me/:docId',
    loadChildren: () => import('./page-space-me/page-space-me.module').then( m => m.PageSpaceMePageModule)
  },
  {
    path: 'tabs/TextEdit/:docId',
    // different from the id we had before, this new docId is from FireStore
    loadChildren: () => import('./editing-tool-test-page/editing-tool-test-page.module').then( m => m.EditingToolTestPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'find-password',
    loadChildren: () => import('./find-password/find-password.module').then( m => m.FindPasswordPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'find-password',
    loadChildren: () => import('./find-password/find-password.module').then( m => m.FindPasswordPageModule)
  },
  {
    path: 'TextEdit',
    loadChildren: () => import('./editing-tool-test-page/editing-tool-test-page.module').then( m => m.EditingToolTestPagePageModule)
  },
  {
    path: 'crud-demo',
    loadChildren: () => import('./crud-demo/crud-demo.module').then( m => m.CRUDDemoPageModule)

  },
  {
    path: 'add-data',
    loadChildren: () => import('./add-data/add-data.module').then( m => m.AddDataPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
