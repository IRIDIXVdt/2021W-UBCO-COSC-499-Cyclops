import { Component, OnInit, ViewChild } from '@angular/core';
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
  private pageRead = false;



  @ViewChild(IonContent) content: IonContent;
  status: any;
  segmentDepth: number[] = [0, 0, 0];
  currentSegment = 0;
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

  }


  constructor(
    public popover: PopoverController,
    public modalController: ModalController,
    private modalCtrol: ModalController,
    private activatedrouter: ActivatedRoute,
    public firebaseService: FirebaseService,
    public authService: AuthService
  ) {

    this.docId = this.activatedrouter.snapshot.paramMap.get('docId');
    //console.log("docid------",this.activatedrouter.snapshot.paramMap.get('docId'));
    this.loadDataById();
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
      console.log(`Scrolled to ${targetPercent}% on `, this.currentSegment);
      // this ensures that the event only triggers once
      this.pageRead = true;
      // do your analytics tracking here
    }
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
