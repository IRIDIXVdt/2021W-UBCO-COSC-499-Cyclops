import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  constructor( public authService: AuthService) { this.startTimer()}

  ngOnInit() {
  }

  timeLeft: number = 60;
  interval;
  block:boolean =true;
  resetTimeLeft(){
    this.timeLeft =60;
  }
  startTimer() {
    return this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.block = true;
        this.timeLeft= this.timeLeft-1;
        
      } else {       
        this.block = false;
        clearInterval(this.interval);
        return false;
      }
    },1000)
  }



}
