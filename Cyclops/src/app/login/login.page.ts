import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email ="";
  password="";
  

  focused: boolean;
  focused2: boolean;

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  onBlur2(event: any) {
    const value2 = event.target.value;

    if (!value2) {
      this.focused2 = false;
    }
  }

  constructor(public afAuth:AngularFireAuth) { }

  ngOnInit() {
  }


  async login(){
    
    try{
      const res= await this.afAuth.signInWithEmailAndPassword(this.email,this.password);
      if(res.user.uid){
        console.log(res.user.uid)
      }
    }catch(err){
      console.log(err);
    }
  } 

}
