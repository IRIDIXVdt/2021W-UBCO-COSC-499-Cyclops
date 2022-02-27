import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FirebaseService } from '../FirebaseService/firebase.service';
import { displayArticle, segmentItem } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';
import { AuthService } from '../authentication/auth/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-page-space-la',
  templateUrl: './page-space-la.page.html',
  styleUrls: ['./page-space-la.page.scss'],
})
export class PageSpaceLaPage implements OnInit {
  articleProgress: number = 0;
  totalArticles: number = 0;
  finishedArticles: number = 0;
  userInput: string;
  userId: any;
  userData: any;
  articleCol: fetchArticle[][];
  editMode: boolean = false;
  // userInput string is used for search bar input
  i: number = 0;
  status1: any;
  dummySearchField: fetchArticle[];
  searchField: fetchArticle[];
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    console.log('current segment is', this.status1);
  }

  constructor(
    public alertController: AlertController,
    public firebaseService: FirebaseService,
    public authService: AuthService,
    public loadingController: LoadingController,
  ) {
    this.status1 = "Articles p1";
    if (this.authService.isLogin()) {
      this.userId = JSON.parse(localStorage.getItem('user'))['uid'];
    }
  }

  contentLoading() {

    this.firebaseService.getDataServiceMainPage().subscribe((res) => {
      this.searchField = res.map(e => {
        return {
          id: e.payload.doc.id,
          columnName: e.payload.doc.data()['columnName'],
          title: e.payload.doc.data()['title'],
          subtitle: e.payload.doc.data()['subtitle'],
          segment: e.payload.doc.data()['segment'],
          cardIntroduction: e.payload.doc.data()['cardIntroduction'],
          image: e.payload.doc.data()['image']
        }
      })
      console.log("Search Field Loaded",this.searchField);
      this.articleCol = [[], [], []];
      for (this.i = 0; this.i < this.searchField.length; this.i++) {
        //load data into each column
        const currentArticle = this.searchField[this.i];
        if (currentArticle.columnName == '1') {
          this.articleCol[0].push(currentArticle);
        } else if (currentArticle.columnName == '2') {
          this.articleCol[1].push(currentArticle);
        } else if (currentArticle.columnName == '3') {
          this.articleCol[2].push(currentArticle);
        }
      }
      this.i = 0;
      console.log("independent data loaded!", this.articleCol);
    }, (err: any) => {
      console.log(err);
    })
    
  }

  async loadData(searchbarComponent: HTMLElement) {
    this.contentLoading();
    searchbarComponent.style.display = "block";
    // loadData loads all article information into the searchField Component
   
  }
  searchBarOnclick() {
    this.dummySearchField = this.searchField;
    console.log("clicked");
  }

  readArticles() {
    /*let currentUserData = (await this.firebaseService.getCurrentUserData()).data();
    let segmentData: any[] = currentUserData.readArticles;
    this.totalArticles = segmentData.length;
    for (let segment of segmentData) {
      console.log(segment['segment']);
      if (this.areAllTrue(segment['segment'])) {
        ++this.finishedArticles;
      }
    }
    console.log('current user progess:', this.finishedArticles, '/', this.totalArticles, (this.finishedArticles / this.totalArticles));
    this.articleProgress = this.finishedArticles / this.totalArticles;*/
    const subscription = this.firebaseService.getUserByIdService(this.userId).subscribe(
      e => {
        this.userData = e.payload.data()['readArticles'];
        this.totalArticles = this.userData.length;
        this.finishedArticles = 0;
        for (let i = 0; i < this.userData.length; i++) {
          if (this.areAllTrue(this.userData[i]['segment'])) {
            ++this.finishedArticles;
          }
        }
        console.log('current user progess:', this.finishedArticles, '/', this.totalArticles, (this.finishedArticles / this.totalArticles));
        this.articleProgress = this.finishedArticles / this.totalArticles;
        //subscription.unsubscribe();
      },
      err => {
        console.debug(err);
      }
    )
  }

  areAllTrue(array) {
    for (let b of array) if (!b) return false;
    return true;
  }

  ngOnInit() {
    if (this.authService.isLogin()) {
      this.readArticles();
    }
    const thisNotShow = document.querySelector('#requested') as HTMLElement;
    thisNotShow.style.display = 'none';

    const textSpace = document.querySelector('#origin') as HTMLElement;
    const searchbar = document.querySelector('ion-searchbar');
    searchbar.style.display = "none";
    this.loadData(searchbar);
    searchbar.addEventListener('ionFocus', handleFocus);
    //searchbar focus, hide other things
    function handleFocus() {
      const searchResult = document.querySelector('#requested') as HTMLElement;
      console.log('message Focus emit');
      // items = Array.from(document.querySelector('ion-grid').children as HTMLCollectionOf<HTMLElement>);
      requestAnimationFrame(() => {
        textSpace.style.display = 'none';
        searchResult.style.display = 'block';
      });

    }

    searchbar.addEventListener('ionBlur', handleBlur);
    //searchbar blur, hide other things
    function handleBlur() {
      const searchResult = document.querySelector('#requested') as HTMLElement;
      console.log('message Blur emit');
      requestAnimationFrame(() => {
        textSpace.style.display = 'block';
        searchResult.style.display = 'none';
      });
    }
  }

  editModeOnchange(state) {
    this.editMode = state;
  }
  async enterEditMode() {
    this.editModeOnchange(true);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: '',
      message: "You are entering Edit Mode. You can add, remove, and edit \"article cards\" here.",
      buttons: ['Ok']
    });
    await alert.present();
  }
  async exitEditMode() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want to exit Edit Mode? All unsaved changes will be lost.',
      buttons: ['Cancel', 'Yes']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role == "cancel") {
      console.log("cancel!");
    } else {
      this.contentLoading();
      this.editModeOnchange(false);
    }
  }

  async saveEditMode() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want to upload all your changes to cloud and exit?',
      buttons: ['Cancel', 'Yes']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role == "cancel") {
      console.log("cancel!");
    } else {
      // const loading = await this.loadingController.create({
      //   message: 'Please wait...',
      // });
      // loading.present();  // present loading animation

      // return this.afAuth.signOut().then(() => {

      //   loading.dismiss();

      // }).catch((error) => {
      //   console.log(error);
      //   loading.dismiss();

      // })
      this.editModeOnchange(false);
    }
  }
}

type fetchArticle = {
  id: string;
  title: string;
  subtitle: string;
  cardIntroduction: string;
  segment: segmentItem[];
  columnName: string;
  image: string;
  //we still need the columnName for displaying, columnName less than 0 means it is deleted
}

