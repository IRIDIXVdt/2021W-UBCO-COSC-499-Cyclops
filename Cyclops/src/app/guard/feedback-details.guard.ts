import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth/auth.service';
import { DisplayFeedbackDetailsPage } from '../userProfile/display-feedback-details/display-feedback-details.page';

@Injectable({
  providedIn: 'root'
})
export class FeedbackDetailsGuard implements CanActivate {
  // this guard is not working 
  constructor(
    public authService: AuthService,
    public alertController: AlertController,
    public router: Router,
    public feedbackDetails: DisplayFeedbackDetailsPage) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const authorUserUid = this.feedbackDetails.currentFeedback.userUid
    const accessUserUid = JSON.parse(localStorage.getItem('user')).uid

    if (!this.authService.isLogin() || (authorUserUid != accessUserUid)) {
      console.log('no login or not match');
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: 'You do not have authorization to access this page',
        buttons: ['Back to Home']
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      if (role == "Back to Home") {
        this.router.navigate(['tabs/page-space-er']);
      }
    }

    console.log('login');
    return this.authService.isLogin() && (authorUserUid == accessUserUid);

  }



}
