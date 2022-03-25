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
  slider: number; //variable for range slider
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
    this.slider = 0;
    this.scoreArea = 0;
    this.contentLoading();
    // this.dummyContentLoading();
    this.sections = sectionList;
    this.sortTypeOnChange();
    if (JSON.parse(localStorage.getItem('user')) != null) {
      this.userId = JSON.parse(localStorage.getItem('user')).uid;
    } else {
      this.userId = 'null';
    }

    // console.log(this.userId);
    //this.ecoListContentLoading();  // move this inside the contentLoading()
    this.userProgressTypeInit();
    this.initializeColor();

  }

  async popAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }

  async alertMessage(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }

  assignCompletedList() {
    //this merges information from both lists: the solution list and the user list
    this.scoreArea = 0;
    for (let item of this.localSol) {
      // if (this.completedList.indexOf(item.id) > -1) {
      //stop as soon as there is a match
      for (let ecoAttendItem of this.userEcoItemList) {
        if (item.id === ecoAttendItem.ecoId) {
          item.attend = true;
          item.weight = ecoAttendItem.weight;

          // item.weight = 1;//tentative
          //we have this solution attended by our user
          // console.log(this.scoreArea, 'adds', item.star, ecoAttendItem.weight, 'from', item.name);
          this.scoreArea += (item.star + 1) * ecoAttendItem.weight;//add up the new weights to the ecotracker
          break;
          //as there should only be one match for the whole list, we can break here to save some computations
        }
      }
    }

    this.displaySol = this.localSol;
    console.log('loaded solution and user progress successfully merged');
  }
  updateUserTotalEcoScore() {
    //update total score  to database
    const data: any = {
      totalEcoScore: this.scoreArea
    }
    this.firebaseService.addUserEcoService(this.userId, data).then(() => {
      console.log('updated userName');
    }).catch((error) => {
      console.log(error);
      this.alertMessage("Check your internet Connection");
    });
  }


  userProgressTypeInit() {
    this.userProgressType = "not";
  }

  progressTypeOnChange() {
    console.log("current type is:", this.userProgressType);
    //code here
  }

  initializeColor() {
    this.color = 'medium';
  }

  rangeChangeEvent(currentWeight, currentId) {
    console.log("range change event\nthe new weight is:", currentWeight, '\nchange weight for article id:', currentId);

  }

  localWeightUpdate(currentWeight, currentId) {
    //assign this new weight to localSol
    let onChangeItem = this.localSol.find(i => i.id == currentId);//locates the onChange Item
    onChangeItem.weight = currentWeight;//change the weight
  }

  colorAssign(color: number) {
    if (color == 2) {
      return 'success';
    }
    else if (color == 1) {
      return 'warning';
    }
    else if (color == 0) {
      return 'medium';
    }
    else {
      return 'danger';
    }

  }

  ecoListContentLoading() {
    if (this.authService.isLogin()) {
      const subscription = this.firebaseService.getUserByIdService(this.userId).subscribe(
        e => {
          this.userEcoItemList = e.payload.data()["userEcoSolutions"];
          // console.log(this.userEcoItemList);
          if (this.userEcoItemList == undefined) {//check with new account for testing*
            this.userEcoItemList = [];
          }
          //user eco list item consists of all the solutions the user has attempted
          this.assignCompletedList();
          this.updateDisplayList();
          subscription.unsubscribe();
          console.log('unsubscribe success', this.userEcoItemList);
        }, err => {
          console.debug(err);
          this.userEcoItemList = [];
        })
    }

  }

  async submitEcoSolEvent(solutionWeight: number, solutionId: string) {
    const currentTime = new Date().getTime();
    console.log("onSubmit", solutionId, this.userId, currentTime);
    const uploadData: userEcoItem = {//sol'n init
      time: currentTime,
      ecoId: solutionId,
      weight: solutionWeight,//by default
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
      this.updateUserTotalEcoScore();
      this.alertMessage("Successful");
      this.localWeightUpdate(solutionWeight, solutionId);//update this score to localSol
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
          weight: 0,
        }
      })
      this.localSol = this.solutions;

      this.ecoListContentLoading();
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
    console.log("update display with rule:\nsort type:", this.sortType, '\nseciton name:', this.section, '\nprogress type:', this.userProgressType);
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
  weight: number;
}
type userEcoItem = {
  time: number;
  ecoId: string;
  weight: number;
}

