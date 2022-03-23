import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { PageSpaceMePage } from '../page-space-me/page-space-me.page';
import { Router } from '@angular/router';
import { FirebaseService } from '../FirebaseService/firebase.service';
import { Observable, from, of } from 'rxjs'
import { filter } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';
import { convertToViews } from '@ionic/core/dist/types/components/nav/view-controller';
import { solutionItem, sectionList, ecoData } from '../sharedData/ecoData';
import { AuthService } from '../authentication/auth/auth.service';

@Component({
  selector: 'app-page-space-su',
  templateUrl: './page-space-su.page.html',
  styleUrls: ['./page-space-su.page.scss'],
})
export class PageSpaceSuPage implements OnInit {

  profile = {
    solution: "Solution", // retrives solution from score modal
    section: "Section", // retrives section from score modal
    range: 0, // retrives value from score modal
    level: 0, // retrives level from score modal
    updatedscore: 0, // retrives level*range
    rating: 0
  }

  surveyPage: PageSpaceMePage;

  solutions;
  // selectOptions;
  localSol: fetchSolution[];
  displaySol: fetchSolution[];
  sortType: string;//this handles the type of sorting
  section: string;//this handles which section we want
  sections: string[];
  userId: string;//this is the login user Id
  userProgressType: string; //take cares of what to display


  userEcoItemList: userEcoItem[];
  // completedList: string[];
  scoreArea: number;
  range: number; //variable for range slider
  color: string; // String to get color value for color change


  constructor(
    private modalCtrol: ModalController,
    public navCtrl: NavController,
    public firebaseService: FirebaseService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthService
  ) {
    this.scoreArea = 0;
    this.contentLoading();
    // this.dummyContentLoading();
    this.sections = sectionList;
    this.sortTypeOnChange();
    if(JSON.parse(localStorage.getItem('user')) != null){
      this.userId = JSON.parse(localStorage.getItem('user')).uid;
    }else{
      this.userId = 'null';
    }
    
    // console.log(this.userId);
    this.ecoListContentLoading();
    this.userProgressTypeInit();

  }

  async popAlert(message){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }

  async alertMessage(message){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }

  assignCompletedList() {
    this.scoreArea = 0;
    for (let item of this.localSol) {
      // if (this.completedList.indexOf(item.id) > -1) {
      //stop as soon as there is a match
      for (let ecoAttendItem of this.userEcoItemList) {
        if (item.id === ecoAttendItem.ecoId) {
          item.attend = true;
          // console.log(this.scoreArea, 'adds', item.star, ecoAttendItem.weight, 'from', item.name);
          this.scoreArea += (item.star + 1) * ecoAttendItem.weight;
          break;
        }
      }
    }
    this.displaySol = this.localSol;
    console.log('loaded solution and user progress successfully merged');
  }


  userProgressTypeInit() {
    this.userProgressType = "not";
  }

  progressTypeOnChange() {
    console.log("current type is:", this.userProgressType);
    //code here
  }

  rangeChange($event) {
    console.log("range change");
    //code here
  }

  ecoListContentLoading() {
    if(this.authService.isLogin()){
      const subscription = this.firebaseService.getUserByIdService(this.userId).subscribe(
        e => {
          this.userEcoItemList = e.payload.data()["userEcoSolutions"];
          // console.log(this.userEcoItemList);
          if (this.userEcoItemList == undefined) {//check with new account for testing*
            this.userEcoItemList = [];
          }
          subscription.unsubscribe();
          this.assignCompletedList();
          this.updateDisplayList();
          console.log('unsubscribe success', this.userEcoItemList);
        }, err => {
          console.debug(err);
          this.userEcoItemList = [];
        })
    }
    
  }

  async submitEcoSolEvent(solutionId: string) {
    const currentTime = new Date().getTime();
    console.log("onSubmit", solutionId, this.userId, currentTime);
    const uploadData: userEcoItem = {//sol'n init
      time: currentTime,
      ecoId: solutionId,
      weight: 1,//by default
    }
    //push into sol'n list
    this.userEcoItemList.push(uploadData);
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
      this.updateDisplayList();
      this.alertMessage("Successful");
    }).catch((error) => {
      console.log(error);
      loading.dismiss();
      this.alertMessage("Check your internet Connection");
    });
   
  }


  goSurvey() {
    this.router.navigateByUrl('tabs/page-space-me');
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
        }
      })

      // console.log("content loaded", this.solutions.map((a: any) => a.starLevel));
      this.localSol = this.solutions;
      // console.log("solution", this.solutions);
      this.sortTypeInitialize();
    }, (err: any) => {
      console.log(err);
    })

  }

  dummyContentLoading() {
    // this.localSol = ecoData;
    this.sortTypeInitialize();
  }

  ngOnInit() {

  }

  sortTypeInitialize() {
    this.sortType = "starUp";
    this.section = "All";
  }

 /*   openModal() {
    this.modalCtrol.create({
      component: ScoreModalComponent,
      componentProps: this.profile
    }).then(modalres => {
      modalres.present();
      modalres.onDidDismiss().then(res => {
        if (res.data != null) {
          this.profile = res.data;
        }
      })
    })
  } */

  sortTypeOnChange() {
    // const currentTime = new Date().getTime();
    // console.log("sort type:", this.sortType, currentTime);
    //handle the event here
    //use the new sortType to update displaySol
    if (this.sortType === "starUp") {
      // console.log("sort Asc")
      this.displaySol.sort((a, b) => (a.star > b.star) ? 1 : -1);
    } else if (this.sortType === "starDown") {
      // console.log("sort Des")
      this.displaySol.sort((a, b) => (a.star < b.star) ? 1 : -1);
    } else if (this.sortType === "sN") {
      // console.log("solution name")
      this.displaySol.sort((a, b) => (a.name > b.name) ? 1 : -1);
    } else if (this.sortType === "sT") {
      // console.log("section name")
      this.displaySol.sort((a, b) => (a.section > b.section) ? 1 : -1);
    }
  }

  sectionTypeOnChange() {

    if (this.section === "All") {
      // console.log("Display All");
      // do nothing, keep the list as it is
    } else {
      // console.log(this.section);
      this.displaySol = this.displaySol.filter(f => (f.section === this.section));
    }

  }

  attendTypeOnChange() {
    if (this.userProgressType == "all") {
      // console.log("Select All");
      // do nothing, keep the list as it is
    } else if (this.userProgressType == "not") {
      this.displaySol = this.displaySol.filter(f => (!f.attend));
    } else if (this.userProgressType == "com") {
      this.displaySol = this.displaySol.filter(f => (f.attend));
    }
  }

  updateDisplayList() {
    console.log("update display with rule:",this.sortType,this.section,this.userProgressType);
    // this display list handles everything:
    this.displaySol = this.localSol;
    // 1. attend type
    this.sectionTypeOnChange();
    // 2. section type
    this.attendTypeOnChange()
    // 3. sort type
    this.sortTypeOnChange()
  }
}

type fetchSolution = {
  id: string;
  name: string;
  star: number;
  detail: string;
  section: string;
  attend: boolean;
}
type userEcoItem = {
  time: number;
  ecoId: string;
  weight: number;
}

