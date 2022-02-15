import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public authService: AuthService){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    return !this.authService.isLogin() ;
  }
  
}
