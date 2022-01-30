import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {PageSpaceErPage} from '../page-space-er/page-space-er.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email ="";
  password="";
  
  currentUser:any;

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

  constructor(public afAuth:AngularFireAuth) { 
    if(this.afAuth.currentUser){
      
    }
  }

  ngOnInit() {
  }


  async login(){
    
    try{
      const res= await this.afAuth.signInWithEmailAndPassword(this.email,this.password);
      if(res.user.uid){
        console.log(res.user.uid,"  ")
        if(this.afAuth.currentUser){
          this.currentUser = (await this.afAuth.currentUser).email
          console.log(this.afAuth.currentUser)
        }else{
          console.log("no")
        }
      }
    }catch(err){
      console.log(err);
    }
  } 

}
