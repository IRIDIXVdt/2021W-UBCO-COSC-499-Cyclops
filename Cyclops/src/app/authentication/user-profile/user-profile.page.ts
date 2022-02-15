import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  userData = JSON.parse(localStorage.getItem('user'));



  constructor(public authService: AuthService,public alertController: AlertController) { }

  ngOnInit() {
  }

  async editUsername(a) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit User Name',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Current UserName: '+a
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
          text: 'Ok',
          handler: () => {
            this.authService.updateUserName('name1');
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
