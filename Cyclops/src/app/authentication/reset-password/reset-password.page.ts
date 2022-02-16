import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public errorMessages = {
    email: [
      {
        type: 'required', message: 'Email is required.'
      },
      {
        type: 'pattern', message: 'Please enter a valid email address.'
      }
    ]
  }


  resetForm: FormGroup;
  constructor(public authService: AuthService, public alertController: AlertController,) {

    this.resetForm = new FormGroup({
      formEmail: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });
  }

  ngOnInit() {
  }

  timeLeft: number;
  interval;
  block: boolean = false;

  async resetPassword(email) {
    if(this.authService.isLogin()){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: 'For security reasons, you will be sign-out. Do you want to continue?',
        buttons: ['Cancel', 'Yes']
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      if (role == "cancel") {
        console.log("cancel!");
      } else {
        this.startTimer()
        this.authService.ForgotPassword(email);
      }
    }else{
      this.startTimer()
      this.authService.ForgotPassword(email);
    }
  }
    


  startTimer() {
    console.log('start')
    this.timeLeft = 20;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.block = true;
        this.timeLeft = this.timeLeft - 1;

      } else {
        this.block = false;
        clearInterval(this.interval);
      }
    }, 1000)
  }

}
