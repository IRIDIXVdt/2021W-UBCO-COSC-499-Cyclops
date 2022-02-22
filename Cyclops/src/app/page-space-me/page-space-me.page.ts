import { Component, OnInit, ViewChild} from '@angular/core';
import { PopoverController, IonContent } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { ModalController } from '@ionic/angular';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { ActivatedRoute } from '@angular/router';
import { displayArticle } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';
import { FirebaseService } from '../FirebaseService/firebase.service';
import { AuthService } from '../authentication/auth/auth.service';
import { segment } from '../sharedData/segment';
@Component({
  selector: 'app-page-space-me',
  templateUrl: './page-space-me.page.html',
  styleUrls: ['./page-space-me.page.scss'],
})
export class PageSpaceMePage implements OnInit {


  contents: any;
  docId: any;
  feedback = {
    content: ""
  }
  currentSegments: any;////array of boolean values corresponding to the segments of the current article showing which segment the user has read
  pageRead: boolean; //whether this page has been read
  userId: any;
  userData: any;//corresponding to the readArticles field in the user document on firehost
  hasScrollbar:boolean;



  @ViewChild(IonContent) content: IonContent;
  status: any;
  segmentDepth: number[] = [0, 0, 0];
  currentSegment = 0;




  constructor(
    public popover: PopoverController,
    public modalController: ModalController,
    private modalCtrol: ModalController,
    private activatedrouter: ActivatedRoute,
    public firebaseService: FirebaseService,
    public authService: AuthService
  ) {
    this.status = 0;
    this.docId = this.activatedrouter.snapshot.paramMap.get('docId');
    //console.log("docid------",this.activatedrouter.snapshot.paramMap.get('docId'));
    console.log(this.docId);
    this.loadDataById();//load article data
    this.userId = JSON.parse(localStorage.getItem('user'))['uid'];
    this.loadUserSegmentsById();//load all user segment data
  }

  loadUserSegmentsById() {
    console.log("run loadUserById()");
    const subscription = this.firebaseService.getUserByIdService(this.userId).subscribe(
      e => {
        this.userData = e.payload.data()['readArticles'];
        for (let i = 0; i < this.userData.length; i++) {
          if (this.userData[i]['id'] == this.docId) {
            this.currentSegments = this.userData[i]['segment']
          }
        }
        subscription.unsubscribe();
        console.log('unsubscribe success, with this user segment content loaded:', this.currentSegments);
        //after subscription closed and segment content has been loaded, scrollbar can be checked
        this.checkForScrollbar();
        
      },
      err => {
        console.debug(err);
      }
    )

  }
  loadDataById() {
    console.log("run loadDataById()");
    const subscription = this.firebaseService.getDataByIdService(this.docId).subscribe(
      e => {
        this.contents = {

          /* image:e.payload.data()['image'],
          title:e.payload.data()['title'],
          subtitle:e.payload.data()['subtitle'],
          segment:e.payload.data()['segment']  */

          id: e.payload.data()['id'],
          title: e.payload.data()['title'],
          subtitle: e.payload.data()['subtitle'],
          image: e.payload.data()['image'],
          segment: e.payload.data()['segment'],
          cardIntroduction: e.payload.data()['cardIntroduction'],
          columnName: e.payload.data()['columnName'],

        };
        subscription.unsubscribe();
        console.log('unsubscribe success, with this content loaded:', this.contents);
      },
      err => {
        console.debug(err);
      }
    )
  }

  segmentChanged(ev: any) {
    console.log('current segment is', this.status);
    switch (this.status) {
      case 'segment1':
        this.currentSegment = 0;
        break;
      case 'segment2':
        this.currentSegment = 1;
        break;
      case 'segment3':
        this.currentSegment = 2;
        break;
    }
    this.content.scrollToPoint(0, this.segmentDepth[this.currentSegment]);
    this.checkForScrollbar();//check for scrollbar everytime the segment changes

  }

  updateDataById(docId, data) {
    this.firebaseService.updateDataByIdService(docId, data).then((res: any) => {
      console.log(res);
    })

    alert("successful");
  }

  async notifications(event) {
    const popover = await this.popover.create({
      event,
      component: PopoverComponent,
      animated: true,
      showBackdrop: false,
    });
    return await popover.present();
  }

  presentModal() {
    this.modalCtrol.create({
      component: FeedbackModalComponent,
      componentProps: {
        title: this.contents.title,
      }
    }).then(modalres => {
      modalres.present();

      modalres.onDidDismiss().then(res => {
        if (res.data != null) {
          this.feedback = res.data;
        }
      })
    })
  }

  ngOnInit() {

  }

  async onScroll($event) {
    const scrollElement = await $event.target.getScrollElement();
    //scrollHeight: height of content, clientHeight: height of view port
    //track only scrolltop when bottom of page reached
    //articleHeight changes with responsive screen sizes
    const articleHeight = scrollElement.scrollHeight - scrollElement.clientHeight;

    const currentScrollDepth = $event.detail.scrollTop;
    this.segmentDepth[this.currentSegment] = currentScrollDepth;
    const targetPercent = 90;

    let triggerDepth = ((articleHeight / 100) * targetPercent);

    if (currentScrollDepth >= triggerDepth) {
      let pageRead = true;
      console.log(`This segment read, scrolled to ${targetPercent}% on `, this.currentSegment);

      // this ensures that the database is only changed if the page has been read and the database doesn't already say true
      if (pageRead && !this.currentSegments[this.currentSegment]) {
        console.log('updating database');
        this.updateFirestoreUserSegments();
        return;
      }
      // do your analytics tracking here
    }
  }

  async checkForScrollbar() {//if there is no scrollbar then consider the page read
    const scrollElement = await this.content.getScrollElement();
    this.hasScrollbar = scrollElement.scrollHeight > scrollElement.clientHeight;
    if(!this.hasScrollbar&&!this.currentSegments[this.currentSegment]){//if the database is marked as unread then update it
      console.log('no scrollbar and database indicates page has not been read, Updating database');
      this.updateFirestoreUserSegments();
    }
  }

  updateFirestoreUserSegments(){
    for (let i = 0; i < this.userData.length; i++) {
      if (this.userData[i]['id'] == this.docId) {
        this.userData[i]['segment'][this.currentSegment] = true;
        console.log(this.userData[i]);
        this.firebaseService.updateUserDataByIdService(this.userId, { readArticles: this.userData });
      }
    }

  }

  openModal() {
    this.modalCtrol.create({
      component: EditModalComponent,
      componentProps: {
        // send data to modal
        id: this.docId,
        title: this.contents.title,
        subtitle: this.contents.subtitle,
        image: this.contents.image,
        segment: JSON.parse(JSON.stringify(this.contents.segment))

      }
    }).then(modalres => {
      modalres.present();

      modalres.onDidDismiss().then(res => {
        if (res.data != null) {
          /*  this.contents[this.articleId] = res.data; */
          this.contents.title = res.data.title;
          this.contents.subtitle = res.data.subtitle;
          this.contents.image = res.data.image;
          this.contents.segment = res.data.segment;
          //update data here
          console.log("have data" + this.contents[this.docId]);
          console.log(res.data);
          this.updateDataById(this.docId, this.contents)
        } else {
          console.log("no data ");
          console.log(res.data);
        }
      })

    })
  }

}
