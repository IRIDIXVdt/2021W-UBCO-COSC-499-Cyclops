import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginPageGuard implements CanActivate {

  // this guard only for login page.  if user already login, they can not go to login page
  constructor(public authService: AuthService){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    return !this.authService.isLogin() ;
  }
  
}
