import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth/auth.service';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';

@Component({
  selector: 'app-display-feedback',
  templateUrl: './display-feedback.page.html',
  styleUrls: ['./display-feedback.page.scss'],
})
export class DisplayFeedbackPage implements OnInit {
  timeN = new Date();
  n = this.timeN.getUTCDate;

  feedback:any;
  userData = JSON.parse(localStorage.getItem('user'));

  constructor(public authService: AuthService, public firebaseService: FirebaseService) { }
  timeP:any;
  ngOnInit() {
    this.getFeedback();
  }

  time(){
    this.timeP = this.timeN.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    console. log(
    this.timeN.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    );
  }


  getFeedback(){
    this.firebaseService.getCollectionByNameService('feedback').subscribe((res) => {
      this.feedback = res.map(e => {
        return {
          docId: e.payload.doc.id,
          agree: e.payload.doc.data()['agree'],
          articleTitle: e.payload.doc.data()['articleTitle'],
          contactType: e.payload.doc.data()['contactType'],
          content: e.payload.doc.data()['content'],
          email: e.payload.doc.data()['email'],
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          phoneNumber: e.payload.doc.data()['phoneNumber'],
          userUid: e.payload.doc.data()['userUid'],

        }
      })
      console.log(this.feedback);
    }, (err: any) => {
      console.log(err);
    })
  
  }

}
