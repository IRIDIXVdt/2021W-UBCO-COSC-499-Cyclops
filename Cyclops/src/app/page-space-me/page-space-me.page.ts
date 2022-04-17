import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PopoverController, IonContent, AlertController, LoadingController } from '@ionic/angular';
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
  userEcoItemList: userEcoItem[];
  userEcoItemListRemote: userEcoItem[];
  solutionTotalScore = 0; // total score of all solutions
  scoreArea: number;
  solutions: any;
  currentSectionSolutions: any;
  localSol: fetchSolution[];
  displaySol: fetchSolution[] = [];
  @ViewChild(IonContent) content: IonContent;
  status: any;
  segmentDepth: number[];
  currentSegment = 0;
  articleHeight = 0;

  progressAlertMessage: string;

  ecoSolutionIdList: string[] = [];

  constructor(
    public popover: PopoverController,
    public modalController: ModalController,
    private modalCtrol: ModalController,
    private activatedrouter: ActivatedRoute,
    public loadingController: LoadingController,
    public firebaseService: FirebaseService,
    public alertController: AlertController,
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
    this.contentLoading();
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
          solutions: e.payload.data()['solutions'],
          solSegment: e.payload.data()['solSegment']

        };
        this.segmentDepth = Array(this.contents.segment.length).fill(0);
        //after content loaded, check if page is accessed from for you section
        if (this.authService.isLogin()) {
          if (localStorage.getItem('forYou') == 'true') {
            localStorage.setItem('forYou', 'false');//reset foryou check
            console.log('from for you');
            //get segment and depth
            const subscription = this.firebaseService.getUserDataByIdService(this.userId).subscribe(
              async e => {
                if (e.payload.data()['readArticles'] != undefined) {
                  console.log('readarticles found');
                  this.userData = e.payload.data()['readArticles'];
                  for (let i = 0; i < this.userData.length; i++) {
                    if (this.userData[i]['id'] == this.docId) {
                      this.status = this.userData[i]['currentSegment'];
                      console.log(this.status);
                      //this.content.scrollToPoint(0, this.userData[i]['depth'] * 50);

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
        if (this.contents.solutions) {
          for (let item of this.contents.solutions) {
            this.ecoSolutionIdList.push(item.id);
          }
        }

      },
      err => {
        console.debug(err);
      }
    )
  }
  contentLoading() {
    //stop sub while read
    this.firebaseService.getAllEcoSolutionService().subscribe((res) => {
      this.solutions = res.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          detail: e.payload.doc.data()['detail'],
          section: e.payload.doc.data()['section'],
          star: e.payload.doc.data()['star'],
          attend: false,
          weight: 0,
        }
      })
      this.localSol = this.solutions;


      this.ecoListContentLoading();
      // this.userEcoItemList = this.userEcoItemList;
      //this.sortTypeInitialize();
    }, (err: any) => {
      console.log(err);
    })

  }

  async segmentChanged(ev: any) {
    let scrollElement = await this.content.getScrollElement();
    this.articleHeight = scrollElement.scrollHeight - scrollElement.clientHeight
    console.log('current segment status is', this.status);
    this.currentSegment = parseInt(this.status);
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

      position = this.segmentDepth[this.currentSegment];
      this.updateFirestoreUserDepth();

      let completion = this.areAllTrue(this.currentSegments);
      console.log('completion: ', completion);
      this.firebaseService.updateUserCollectionDataByIdService(this.userId, { latestRead: { id: this.docId, segment: this.currentSegment, depth: position, completed: completion } });

    }
  }
  colorAssign(color: number) {
    if (color == 2) {
      this.progressAlertMessage = "Doing it!"
      return 'success';
    }
    else if (color == 1) {
      this.progressAlertMessage = "Working on it!"
      return 'warning';
    }
    else if (color == 0) {
      this.progressAlertMessage = "Not doing it!"
      return 'danger';
    }
    else {
      this.progressAlertMessage = "Not applicable"
      return 'medium';
    }

  }
  rangeChangeEvent(currentWeight, currentId) {
    console.log("range change event\nthe new weight is:", currentWeight, '\nchange weight for article id:', currentId);

  }
  async displaySolutionDetail(description) {
    const alert = await this.alertController.create({
      cssClass: 'alertSolutionContentDetails',
      message: description,
      buttons: ['Continue']
    });
    await alert.present();
  }

  updateEcoItemList(data, update: boolean) {
    if (update) {
      let onChangeItem = this.userEcoItemList.find(i => i.ecoId == data.ecoId);//locates the onChange Item
      onChangeItem.weight = data.weight;//change the weight
    } else {
      console.log(this.userEcoItemList);
      this.userEcoItemList.push(data);
    }
  }
  /*updateDisplayList() {
    console.log("update display with rule:\nsort type:", this.sortType, '\nseciton name:', this.section, '\nprogress type:', this.userProgressType);
    // this display list handles everything:
    this.displaySol = this.localSol;
    // 1. attend type
    this.sectionTypeOnChange();
    // 2. section type
    this.attendTypeOnChange()
    // 3. sort type
    this.sortTypeOnChange()
  }*/
  ecoListContentLoading() {
    if (this.authService.isLogin()) {
      const subscription = this.firebaseService.getUserByIdService(this.userId).subscribe(
        e => {
          if (e.payload.data()["userEcoSolutions"] != undefined) {
            this.userEcoItemListRemote = e.payload.data()["userEcoSolutions"];
          }

          // console.log(this.userEcoItemList);
          if (this.userEcoItemListRemote == undefined) {//check with new account for testing*
            this.userEcoItemListRemote = [];
          }
          //user eco list item consists of all the solutions the user has attempted
          this.assignCompletedList();
          // this.updateDisplayList();

          subscription.unsubscribe();
          /* console.log('unsubscribe success', this.userEcoItemListRemote); */
        }, err => {
          console.debug(err);
          this.userEcoItemListRemote = [];
        });

    }

  }
  assignCompletedList() {
    console.log("assign complete list")
    //this merges information from both lists: the solution list and the user list
    if (this.userEcoItemList == undefined) {
      this.userEcoItemList = this.userEcoItemListRemote;
    }
    //reset values first
    this.solutionTotalScore = 0;
    this.scoreArea = 0;
    for (let item of this.localSol) {
      // if (this.completedList.indexOf(item.id) > -1) {
      //stop as soon as there is a match
      this.solutionTotalScore += item.star;
      for (let ecoAttendItem of this.userEcoItemList) {
        if (item.id === ecoAttendItem.ecoId) {
          item.attend = true;
          item.weight = ecoAttendItem.weight;

          // item.weight = 1;//tentative
          //we have this solution attended by our user
          // console.log(this.scoreArea, 'adds', item.star, ecoAttendItem.weight, 'from', item.name);
          this.addScore(item.star, ecoAttendItem.weight);//add up the new weights to the ecotracker
          break;
          //as there should only be one match for the whole list, we can break here to save some computations
        }
      }
    }

    // this.displaySol = this.localSol;
    // ----------------------
    console.log(this.localSol);
    console.log(this.ecoSolutionIdList);
    this.displaySol = this.localSol.filter(f => (this.ecoSolutionIdList.indexOf(f.id) > -1));

    // 00000000000
    console.log(this.displaySol);

    /* console.log('loaded solution and user progress successfully merged', this.scoreArea); */
  }
  addScore(star, weight) {
    if (weight > 0) {
      this.scoreArea += (star + 1) * weight * 0.5;

    } else if (weight == -1) {
      // this.scoreArea -= (star + 1);
      //we deduct the mark on total Score. 
      this.solutionTotalScore -= (star + 1);
    }
  }
  async alertMessage(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }
  updateUserTotalEcoScore() {
    //get solutionTotalScore
    //update total score  to database
    const data: any = {
      totalEcoScore: this.scoreArea,
      solutionTotalScore: this.solutionTotalScore
    }
    this.firebaseService.addUserEcoService(this.userId, data).then(() => {
      /* console.log('updated UserTotalEcoScore'); */
    }).catch((error) => {
      console.log(error);
      this.alertMessage("Check your internet Connection");
    });
  }
  localWeightUpdate(currentWeight, currentId) {
    //assign this new weight to localSol
    let onChangeItem = this.localSol.find(i => i.id == currentId);//locates the onChange Item
    onChangeItem.weight = currentWeight;//change the weight
  }
  async submitEcoSolEvent(solutionWeight: number, solutionId: string, update: boolean) {
    const currentTime = new Date().getTime();
    console.log("onSubmit", solutionId, this.userId, currentTime);
    const uploadData: userEcoItem = {//sol'n init
      time: currentTime,
      ecoId: solutionId,
      weight: solutionWeight,//by default
    }
    //push into sol'n list
    this.updateEcoItemList(uploadData, update);

    const userData: any = {
      userEcoSolutions: this.userEcoItemList,
    }
    //upload to cloud
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();  // present loading animation
    this.firebaseService.addUserEcoService(this.userId, userData).then(() => {
      console.log('updated userName');
      loading.dismiss();
      this.assignCompletedList();//update the card looking and the score as well
      //this.updateDisplayList();
      this.updateUserTotalEcoScore();
      this.alertMessage("Successful");
      this.localWeightUpdate(solutionWeight, solutionId);//update this score to localSol
    }).catch((error) => {
      console.log(error);
      loading.dismiss();
      this.alertMessage("Check your internet Connection");
    });

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
          this.currentSegments[this.currentSegment] = true;
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
      this.currentSegments[this.currentSegment] = true;
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
        console.log('cureentseg updates');
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
type userEcoItem = {
  time: number;
  ecoId: string;
  weight: number;
}
type fetchSolution = {
  id: string;
  name: string;
  star: number;
  detail: string;
  section: string;
  attend: boolean;
  weight: number;
}
