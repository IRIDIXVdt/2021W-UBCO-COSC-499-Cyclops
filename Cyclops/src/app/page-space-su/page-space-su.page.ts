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
import { EcoEditPage } from '../page-space-su/eco-edit/eco-edit.page';


@Component({
  selector: 'app-page-space-su',
  templateUrl: './page-space-su.page.html',
  styleUrls: ['./page-space-su.page.scss'],
})
export class PageSpaceSuPage implements OnInit {

  // profile = {
  //   solution: "Solution", // retrives solution from score modal
  //   section: "Section", // retrives section from score modal
  //   range: 0, // retrives value from score modal
  //   level: 0, // retrives level from score modal
  //   updatedscore: 0, // retrives level*range
  //   rating: 0
  // }

  surveyPage: PageSpaceMePage;

  solutions: any;
  // selectOptions;
  localSol: fetchSolution[];
  displaySol: fetchSolution[];
  sortType: string;//this handles the type of sorting
  section: string;//this handles which section we want
  sections: any;
  userId: string;//this is the login user Id
  userProgressType: string; //take cares of what to display
  progressAlertMessage: string;

  userEcoItemList: userEcoItem[];
  userEcoItemListRemote: userEcoItem[];
  // completedList: string[];
  scoreArea: number;
  slider: number; //variable for range slider
  color: string; // String to get color value for color change
  editMode: boolean = false;//for admin user

  solutionTotalScore = 0; // total score of all solutions

  currentSectionSolutions: any;

  idOfSection:any;

  constructor(
    private modalCtrol: ModalController,
    public navCtrl: NavController,
    public firebaseService: FirebaseService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthService,
  ) {
    this.getSections();
    this.slider = 0;
    this.scoreArea = 0;
    this.contentLoading();
    // this.dummyContentLoading();
    this.sortTypeOnChange();
    if (JSON.parse(localStorage.getItem('user')) != null) {
      this.userId = JSON.parse(localStorage.getItem('user')).uid;
    } else {
      this.userId = 'null';
    }

    // console.log('is Admin?:', this.authService.isAdmin());
    // information on Admin is stored in this.authService.isAdmin()

    // console.log(this.userId);
    //this.ecoListContentLoading();  // move this inside the contentLoading()
    this.userProgressTypeInit();
    this.initializeColor();


  }

  getSections() {
    const subscription = this.firebaseService.getSectionList().subscribe((res) => {
      this.sections = res.map(e => {
        return {
          sectionName: e.payload.doc.data()['sectionName'],
        }
      })
      console.log(this.sections);
    }, (err: any) => {
      this.alertMessage("Check your internet Connection");
    })

    if(this.sections != null){
      subscription.unsubscribe();
    }
   


  }

  async popAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: `
      <p> You can assess your effort to get score</p>
      <p> If you choose: </p>
      <ul>
        <li>Not applicable: Not count for score</li>
        <li>Not Doing it: Get 0 score</li>
        <li>Working on it: Get half of score</li>
        <li>Doing it: Get all score</li>
      </ul>
    `,
      buttons: ['Ok']
    });
    await alert.present();
  }

  async displaySolutionDetail(description) {
    const alert = await this.alertController.create({
      cssClass: 'alertSolutionContentDetails',
      message: description,
      buttons: ['Continue']
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

  //edit mode change section
  editModeOnchange(state) {
    this.editMode = state;
  }

  async enterEditMode() {
    this.editModeOnchange(true);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: '',
      message: "You can add and edit \"Eco Solution\" here. To exit, click the exit button on the top left corner.",
      buttons: ['Ok']
    });
    await alert.present();
  }

  async exitEditMode() {
    this.editModeOnchange(false);
  }

  assignCompletedList() {
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

    this.displaySol = this.localSol;
    console.log('loaded solution and user progress successfully merged', this.scoreArea);
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

  updateUserTotalEcoScore() {
    //get solutionTotalScore
    //update total score  to database
    const data: any = {
      totalEcoScore: this.scoreArea,
      solutionTotalScore: this.solutionTotalScore
    }
    this.firebaseService.addUserEcoService(this.userId, data).then(() => {
      console.log('updated UserTotalEcoScore');
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
          this.updateDisplayList();

          subscription.unsubscribe();
          console.log('unsubscribe success', this.userEcoItemListRemote);
        }, err => {
          console.debug(err);
          this.userEcoItemListRemote = [];
        });

    }

  }

  updateEcoItemList(data, update: boolean) {
    if (update) {
      let onChangeItem = this.userEcoItemList.find(i => i.ecoId == data.ecoId);//locates the onChange Item
      onChangeItem.weight = data.weight;//change the weight
    } else {
      this.userEcoItemList.push(data);
    }
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

  customFormatter(value: number) {

    if (value == -1) {
      return '\xa0\xa0Bad\xa0\xa0';
    } else if (value == 0) {
      return '\xa0\xa0Ok\xa0\xa0';
    } else if (value == 1) {
      return '\xa0\xa0Great!\xa0\xa0'
    } else if (value == 2) {
      return '\xa0\xa0Wonderful!\xa0\xa0'
    }

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

  /* openModal() {
    this.modalCtrol.create({
      component: ScoringPage,
    }).then(modalres => {
      modalres.present();
      modalres.onDidDismiss().then(res => {
        if (res.data != null) {
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

  //admin functions
  editCard(id) {
    console.log('edit', id);

    this.modalCtrol.create({
      component: EcoEditPage,
      componentProps: {
        ecoId: id,
      }
    }).then(modalres => {
      modalres.present();
      modalres.onDidDismiss().then(res => {
        console.log("edit eco modal dismiss!");
      })

    })
  }

  removeFromLocal(id) {
    this.localSol = this.localSol.filter(f => (f.id != id));
    //now local soltion do not contain this

    this.assignCompletedList();
    this.updateDisplayList();
  }

  async removeFromRemote(id) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();  // present loading animation
    this.firebaseService.deleteDocByIdService("NewEcoSolution", id).then((res: any) => console.log(res, " ", id),
      (err: any) => { console.log(err); loading.dismiss(); });
    loading.dismiss();
    this.updateUserTotalEcoScore();

    this.updateDisplayList();
  }

  async removeCard(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want to remove this Eco Tracker Solution? This action cannot be undone.',
      buttons: ['Cancel', 'Yes']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();//fetch result

    if (role == "cancel" || role == "backdrop") {
      console.log('cancel')
    } else {

      //remove locally first
      this.removeFromLocal(id);
      //then remove on remote
      this.removeFromRemote(id);
    }

  }

  solutionAddEvent() {
    console.log("solution add event");
  }

  async editSection(item) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    console.log("section on edit", item);

    var newSectionInputName: string = item;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Editing section ' + item + '. All eco solutions of this section will also be updated.',
      inputs: [
        {
          name: 'sectionTitle',
          type: 'text',
          placeholder: item,
        },
      ],
      buttons: [
        'Cancel',
        {
          text: 'Yes',
          handler: (alertInputData) => {
            
            loading.present();

            newSectionInputName = alertInputData.sectionTitle;
            this.currentSectionSolutions = this.localSol.filter(f => (f.section === item));

            //delete origin one 
            this.localSol = this.localSol.filter(f => (f.section != item))

            for (let data of this.currentSectionSolutions) {
              // edit the section name 
              data.section = newSectionInputName;
              //push to localSol
              this.localSol.push(data);
            }
            this.updateDisplayList();
            for (let data of this.sections) {
              if (data.sectionName == item) {
                data.sectionName = newSectionInputName;
              }
            }
            for (let data of this.currentSectionSolutions) {
              this.firebaseService.updateEcoSolutionService(data.id, data).then((res: any) => {
              }).catch((error) => {
                console.log("error", error);
                loading.dismiss();
              })
            } 

            const subscriptionUpdate = this.firebaseService.getSectionName(item).subscribe((res: any) => {
              if(res.length > 0){ // when res find values
                this.idOfSection = res[0].payload.doc.id;
              }
             
              this.firebaseService.upDateSectionList(this.idOfSection,newSectionInputName).then((res: any) => {
                console.log("Update", res);
              }).catch((error) => {
                console.log("update error", error);
                loading.dismiss();
              })
            });
            /* subscriptionUpdate.unsubscribe();  */
            loading.dismiss();
          }
        }]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();//fetch result




    //update all ids


    //remove locally first

    //then remove on remote

  }





  async removeSection(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want to remove section \'' + item + '\'? All eco solutions of this section will also be removed. This action cannot be undone.',
      buttons: ['Cancel', 'Yes']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();//fetch result

    if (role == "cancel" || role == "backdrop") {
      console.log('cancel')
    } else {
      console.log('remove section event', item);
      //your code here:

      //remove locally first

      //then remove on remote

    }
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

