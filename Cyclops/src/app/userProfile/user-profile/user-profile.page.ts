import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/authentication/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  userData = JSON.parse(localStorage.getItem('user'));

  name= JSON.parse(localStorage.getItem('user')).displayName;



  constructor(public authService: AuthService, public alertController: AlertController) { }

  ngOnInit() {
     this.name = JSON.parse(localStorage.getItem('user')).displayName;
    /* this.name = "testname"; */
  }

  async editUsername() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit User Name',
      inputs: [
        {
          name: 'userName',
          type: 'text',
          min: 3,
          max: 10,
          placeholder: 'Current UserName: ' + this.name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: data => {
            if (true) {
              console.log("run-------------")
              this.authService.updateUserName(data.userName);
              this.userData = JSON.parse(localStorage.getItem('user'));
              // this.name = JSON.parse(localStorage.getItem('user')).displayName;
              this.name = data.userName;
              
            } else {
              this.alertError('You have reached the max length 10');
            }
          }
        }
      ]
    });

    await alert.present();
    console.log(this.userData.displayName);
  }

  validateUserName(data) {
    if (false) {
      return {
        isValid: true,
        message: ''
      };
    } else {
      return false;
    }
  }

  async alertError(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }

}
