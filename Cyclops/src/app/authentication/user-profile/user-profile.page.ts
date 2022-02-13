import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  userData = JSON.parse(localStorage.getItem('user'));



  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
