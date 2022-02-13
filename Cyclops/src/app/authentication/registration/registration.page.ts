import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  
  public errorMessages ={
    email: [
      {
        type:'required', message:'Email is required.'
      },
      {
        type:'pattern', message:'Please enter a valid email address.'
      }
    ],
    password: [
      {
        type:'required', message:'Password is required.'
      },
      {
        type:'minlength', message:'Your password should be more than 6 character.'
      },
      {
        type:'maxlength', message:'Your password should be less than 20 character.'
      },
      /* {
        type:'pattern', message:'Should contains at least one letter and one number.'
      } */
    ],
    confirmPassword: [
      {
      type: 'required', message: 'Check your password.'
      }
    ]
  }


  signUpForm: FormGroup;
  constructor(public authService: AuthService) {
    this.signUpForm = new FormGroup({
      formEmail: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      formPassword: new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        /* Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])") */
      ]),
      confirmFormPassword: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    }, { 
      validators: this.passwordMatch.bind(this)

    });

  }

  passwordMatch(formGroup: FormGroup) {
    const { value: password } = formGroup.get('formPassword');
    const { value: confirmPassword } = formGroup.get('confirmFormPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  ngOnInit() {

  }

}
