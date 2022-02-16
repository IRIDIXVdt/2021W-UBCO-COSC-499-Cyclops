import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth/auth.service';

@Component({
  selector: 'app-display-feedback',
  templateUrl: './display-feedback.page.html',
  styleUrls: ['./display-feedback.page.scss'],
})
export class DisplayFeedbackPage implements OnInit {
  timeN = new Date();
  n = this.timeN.getUTCDate;
  constructor(public authService: AuthService) { }
  timeP:any;
  ngOnInit() {
  }

  time(){
    this.timeP = this.timeN.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    console. log(
    this.timeN.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    );
  }

}
