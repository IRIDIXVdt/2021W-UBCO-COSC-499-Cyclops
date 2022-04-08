import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/authentication/auth/auth.service';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  userData = JSON.parse(localStorage.getItem('user'));

  userEcoScore:number;  // score user currently get

  solutionTotalScore:number; // the total score of all solutions



  constructor(public authService: AuthService, public alertController: AlertController,public firebaseService: FirebaseService) { 
    /* if(JSON.parse(localStorage.getItem('user')).displayName != null){
      this.displayName= JSON.parse(localStorage.getItem('user')).displayName;
    }else{
      this.displayName= JSON.parse(localStorage.getItem('user')).email;
      console.log(this.displayName);
    } */
    this.loadUserEcoScore();


  }

  ngOnInit() {

  }
  loadUserEcoScore(){
    const subscription = this.firebaseService.getUserByIdService(this.userData.uid).subscribe(
      e=>{
        if (e.payload.data()['totalEcoScore'] != undefined){
          this.userEcoScore = e.payload.data()['totalEcoScore']; // get user total eco score
        }
        if(e.payload.data()['totalEcoScore'] == undefined){
          this.userEcoScore =0;
        }

        if (e.payload.data()['solutionTotalScore'] != undefined){
          this.solutionTotalScore = e.payload.data()['solutionTotalScore']; 
        }
        if (e.payload.data()['solutionTotalScore'] == undefined){
          this.solutionTotalScore = 0; 
        }
        
      }
    )  
    if (this.userData.uid == null || this.userData.uid == undefined) {
      subscription.unsubscribe();
    } 
  }

  /* async editUsername() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit User Name',
      inputs: [
        {
          name: 'userName',
          type: 'text',
          min: 3,
          max: 10,
          placeholder: 'Current UserName: ' + this.displayName
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
            if (data.userName != '') {              
              console.log(data)
              this.authService.updateUserName(data.userName);
              this.userData = JSON.parse(localStorage.getItem('user'));
              JSON.parse(localStorage.getItem('user')).displayName = data.userName;
              this.displayName = data.userName;
              
            } else {
              this.alertError('Can not be empty!');
            }
          }
        }
      ]
    });

    await alert.present();
    console.log(this.userData.displayName);
  } */


  async alertError(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }

}
