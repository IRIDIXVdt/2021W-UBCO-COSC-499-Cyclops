import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
import { auth } from 'firebase-admin';
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
  hasScrollbar: boolean;



  @ViewChild(IonContent) content: IonContent;
  status: any;
  segmentDepth: number[];
  currentSegment = 0;
  articleHeight = 0;




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
    this.authService.afAuth.onAuthStateChanged(user => {
      if (user) {
        console.log('logged in:', user.uid);
        this.userId = user.uid;
        this.loadUserSegmentsById();//load all user segment data
      } else {
        this.userId = undefined;
        console.log('logged out, userId: ', this.userId);
      }
    });
    



  }

  loadUserSegmentsById() {
    console.log("run loadUserById()");
    const subscription = this.firebaseService.getUserDataByIdService(this.userId).subscribe(
      e => {
        if (e.payload.data()['readArticles'] != undefined) {
          this.userData = e.payload.data()['readArticles'];
          for (let i = 0; i < this.userData.length; i++) {
            if (this.userData[i]['id'] == this.docId) {
              this.currentSegments = this.userData[i]['segment'];
            }
          }
          this.checkForScrollbar();
        }
        subscription.unsubscribe();
        console.log('unsubscribe success, with this user segment content loaded:', this.currentSegments);
        //after subscription closed and segment content has been loaded, scrollbar can be checked
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
        this.segmentDepth = Array(this.contents.segment.length).fill(0);
        //after content loaded, check if page is accessed from for you section
        if (this.authService.isLogin()) {
          if (localStorage.getItem('forYou') == 'true') {
            localStorage.setItem('forYou', 'false');//reset foryou check

            //get segment and depth
            const subscription = this.firebaseService.getUserDataByIdService(this.userId).subscribe(
              async e => {
                this.content.scrollToBottom();
                if (e.payload.data()['readArticles'] != undefined) {
                  this.userData = e.payload.data()['readArticles'];
                  for (let i = 0; i < this.userData.length; i++) {
                    if (this.userData[i]['id'] == this.docId) {
                      this.status = this.userData[i]['currentSegment'];
                      //this.content.scrollToPoint(0, this.userData[i]['depth'] * 50);
                      this.content.scrollToBottom();

                      break;
                    }
                  }
                }
                subscription.unsubscribe();;
                //after subscription closed and segment content has been loaded, scrollbar can be checked
              },
              err => {
                console.debug(err);
              }
            )

          }
        }



        subscription.unsubscribe();
        console.log('unsubscribe success, with this content loaded:', this.contents);
      },
      err => {
        console.debug(err);
      }
    )
  }

  async segmentChanged(ev: any) {
    let scrollElement = await this.content.getScrollElement();
    this.articleHeight = scrollElement.scrollHeight - scrollElement.clientHeight
    this.currentSegment = parseInt(this.status);
    this.content.scrollToPoint(0, this.segmentDepth[this.currentSegment] * this.articleHeight);
    this.authService.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.checkForScrollbar();//check for scrollbar everytime the segment changes
      }
    });


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
  ngOnDestroy() {
    if (this.userId) {
      let position = 0;
      if (this.hasScrollbar) {
        position = this.segmentDepth[this.currentSegment];
        this.updateFirestoreUserDepth();
      }
      let completion = this.areAllTrue(this.currentSegments);
      console.log('completion: ',completion);
      this.firebaseService.updateUserCollectionDataByIdService(this.userId, { latestRead: { id: this.docId, segment: this.currentSegment, depth: position, completed: completion } });

    }
  }

  async onScroll($event) {
    if (this.userId) {
      
      const scrollElement = await $event.target.getScrollElement();
      //scrollHeight: height of content, clientHeight: height of view port
      //track only scrolltop when bottom of page reached
      //articleHeight changes with responsive screen sizes
      this.articleHeight = scrollElement.scrollHeight - scrollElement.clientHeight;

      const currentScrollDepth = $event.detail.scrollTop / this.articleHeight;
      this.segmentDepth[this.currentSegment] = currentScrollDepth;
      const targetPercent = 0.9;

      //let triggerDepth = ((articleHeight / 100) * targetPercent);

      if (currentScrollDepth >= targetPercent) {
        let pageRead = true;
        console.log(`This segment read, scrolled to ${targetPercent}% on `, this.currentSegment);

        // this ensures that the database is only changed if the page has been read and the database doesn't already say true
        if (pageRead && !this.currentSegments[this.currentSegment]) {
          this.currentSegments[this.currentSegment]=true;
          this.updateFirestoreUserSegments();
          return;
        }
      }

      // do your analytics tracking here
    }
    return;
  }

  async checkForScrollbar() {//if there is no scrollbar then consider the page read
    const scrollElement = await this.content.getScrollElement();
    this.hasScrollbar = scrollElement.scrollHeight > scrollElement.clientHeight;
    if (!this.hasScrollbar && !this.currentSegments[this.currentSegment]) {//if the database is marked as unread then update it
      console.log('no scrolbar');
      this.currentSegments[this.currentSegment]=true;
      this.updateFirestoreUserSegments();
    }
  }

  updateFirestoreUserSegments() {
    for (let i = 0; i < this.userData.length; i++) {
      if (this.userData[i]['id'] == this.docId) {
        this.userData[i]['segment'][this.currentSegment] = true;
        if (this.areAllTrue(this.userData[i]['segment'])) {
          this.userData[i]['progress'] = "completed";
        } else {
          this.userData[i]['progress'] = "partial";
        }
        this.firebaseService.updateUserCollectionDataByIdService(this.userId, { readArticles: this.userData });
        break;
      }
    }
  }

  updateFirestoreUserDepth() {
    for (let i = 0; i < this.userData.length; i++) {
      if (this.userData[i]['id'] == this.docId) {
        this.userData[i]['depth'] = this.segmentDepth[this.currentSegment];
        this.userData[i]['currentSegment'] = this.currentSegment;
        this.firebaseService.updateUserCollectionDataByIdService(this.userId, { readArticles: this.userData });
      }
    }

  }

  areAllTrue(array) {
    for (let b of array) if (!b) return false;
    return true;
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
