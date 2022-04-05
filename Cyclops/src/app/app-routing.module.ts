import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { FeedbackDetailsGuard } from './guard/feedback-details.guard';
import { LoginGuard } from './guard/login.guard';

import {LoginPageGuard} from './guard/login-page.guard';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'Articles',
    loadChildren: () => import('./page-space-la/page-space-la.module').then(m => m.PageSpaceLaPageModule)
  },
  {
    path: 'Home',
    loadChildren: () => import('./page-space-er/page-space-er.module').then(m => m.PageSpaceErPageModule)
  },
  {
    path: 'EcoTracker',
    loadChildren: () => import('./page-space-su/page-space-su.module').then(m => m.PageSpaceSuPageModule)
  },
  {
    path: 'SelectedArticles',
    loadChildren: () => import('./page-space-me/page-space-me.module').then(m => m.PageSpaceMePageModule)
  },
  {
    path: 'tabs/SelectedArticle/:docId',
    loadChildren: () => import('./page-space-me/page-space-me.module').then(m => m.PageSpaceMePageModule)
  },
  {
    path: 'tabs/EditContent/:docId',
    canActivate: [AuthGuard],
    // different from the id we had before, this new docId is from FireStore
    loadChildren: () => import('./editing-tool-test-page/editing-tool-test-page.module').then(m => m.EditingToolTestPagePageModule)
  },
  {
    path: 'tabs/wiki/:docId',
    canActivate: [AuthGuard],
    loadChildren: () => import('./wiki/wiki.module').then(m => m.WikiPageModule)
  },
  {
    path: 'login',
    canActivate: [LoginPageGuard],
    loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./authentication/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'TextEdit',
    loadChildren: () => import('./editing-tool-test-page/editing-tool-test-page.module').then(m => m.EditingToolTestPagePageModule)
  },
  {
    path: 'add-data',
    loadChildren: () => import('./add-data/add-data.module').then(m => m.AddDataPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./authentication/verify-email/verify-email.module').then(m => m.VerifyEmailPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./authentication/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'user-profile',
    canActivate:[LoginGuard],
    loadChildren: () => import('./userProfile/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'display-feedback',
    loadChildren: () => import('./userProfile/display-feedback/display-feedback.module').then( m => m.DisplayFeedbackPageModule)
  },
  {
    path: 'display-feedback-details',
    
    loadChildren: () => import('./userProfile/display-feedback-details/display-feedback-details.module').then( m => m.DisplayFeedbackDetailsPageModule)
  },
  {
    path: 'display-feedback-details/:id',
    loadChildren: () => import('./userProfile/display-feedback-details/display-feedback-details.module').then( m => m.DisplayFeedbackDetailsPageModule)
  },
  {
    path: 'edit-survey',
    canActivate: [LoginGuard],
    loadChildren: () => import('./userProfile/edit-survey/edit-survey.module').then( m => m.EditSurveyPageModule)
  },
  {
    path: 'edit-survey-details',
    canActivate: [AuthGuard],
    loadChildren: () => import('./userProfile/edit-survey-details/edit-survey-details.module').then( m => m.EditSurveyDetailsPageModule)
  },
  {
    path: 'edit-survey-details/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./userProfile/edit-survey-details/edit-survey-details.module').then( m => m.EditSurveyDetailsPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
