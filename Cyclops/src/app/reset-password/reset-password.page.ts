import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public errorMessages ={
    email: [
      {
        type:'required', message:'Email is required.'
      },
      {
        type:'pattern', message:'Please enter a valid email address.'
      }
    ]
  }


  resetForm: FormGroup;
  constructor(public authService: AuthService) {
    this.resetForm = new FormGroup({
      formEmail: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });
   }

  ngOnInit() {
  }

}
