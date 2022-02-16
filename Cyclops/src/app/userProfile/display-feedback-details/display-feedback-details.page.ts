import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';

@Component({
  selector: 'app-display-feedback-details',
  templateUrl: './display-feedback-details.page.html',
  styleUrls: ['./display-feedback-details.page.scss'],
})
export class DisplayFeedbackDetailsPage implements OnInit {

  docId:any;
  currentFeedback:any;

  constructor(private activatedrouter: ActivatedRoute, public firebaseService: FirebaseService,) { 

    this.docId = this.activatedrouter.snapshot.paramMap.get('id');

    this.loadDataById(this.docId);
  }

  ngOnInit() {
    
  }

  loadDataById(id) {
    const subscription = this.firebaseService.getFeedbackByIDService(id).subscribe(
      e => {
        this.currentFeedback = {
          agree: e.payload.data()['agree'],
          articleTitle: e.payload.data()['articleTitle'],
          contactType: e.payload.data()['contactType'],
          content: e.payload.data()['content'],
          email: e.payload.data()['email'],
          firstName: e.payload.data()['firstName'],
          lastName: e.payload.data()['lastName'],
          phoneNumber: e.payload.data()['phoneNumber'],
          userUid: e.payload.data()['userUid'],

        };
        subscription.unsubscribe();
        console.log('unsubscribe success, with this content loaded:', this.currentFeedback);
      },
      err => {
        console.debug(err);
      }
    )
  }

}
