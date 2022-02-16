import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService,public alertController: AlertController,public router: Router,){}
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean>{
    console.log(this.authService.isLogin(),' ------  ', this.authService.isAdmin());
    if(!(this.authService.isLogin() || this.authService.isAdmin())){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: 'You have not Logged-in or you are not Administrator',
        buttons: ['Back to Home']
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      if (role == "Back to Home") {
        this.router.navigate(['tabs/page-space-er']);
      }
    }
    return this.authService.isLogin() || this.authService.isAdmin() ;
  }
  
}
