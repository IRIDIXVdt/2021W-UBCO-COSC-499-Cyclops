import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FirebaseService } from '../FirebaseService/firebase.service';
import { displayArticle, segmentItem } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';
import { AuthService } from '../authentication/auth/auth.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ArticleSearchPagePage } from './article-search-page/article-search-page.page';

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
    private modalCtrol: ModalController,
    public loadingController: LoadingController
  ) {
    this.status1 = "Articles p1";
    this.authService.afAuth.onAuthStateChanged(user=> {
      if (user) {
        console.log('logged in:',user.uid);
        this.userId=user.uid;
        this.readArticles();
      } else{
        this.userId=undefined;
        console.log('logged out, userId: ',this.userId);
      }
    });
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
    const subscription = this.firebaseService.getUserDataByIdService(this.userId).subscribe(
      e => {
        console.log('readarticles starting with ',this.userId,' and ',e.payload.data());
        if(e.payload.data()['readArticles']!=undefined){
          console.log(e.payload.data()['readArticles']);
          this.userData = e.payload.data()['readArticles'];
          console.log('userdata:',this.userData);
          this.totalArticles = this.userData.length;
          this.finishedArticles = 0;
          for (let i = 0; i < this.userData.length; i++) {
            if (this.userData[i]['progress']=="completed") {
              ++this.finishedArticles;
            }
          }
          console.log('current user progess:', this.finishedArticles, '/', this.totalArticles, (this.finishedArticles / this.totalArticles));
          this.articleProgress = this.finishedArticles / this.totalArticles;
        }
        

        if(this.userId==null||this.userId==undefined){
          console.log('unsubscribing readArticles');
          subscription.unsubscribe();
        }
      },
      err => {
        console.debug(err);
      }
    )
  }

  ngOnInit() {
    /*if (this.userId) {
      console.log('logged in,',this.authService.afAuth.currentUser,', calculating progress bar');
      this.readArticles();
    }*/

    const thisNotShow = document.querySelector('#requested') as HTMLElement;
    thisNotShow.style.display = 'none';

    const textSpace = document.querySelector('#origin') as HTMLElement;
    const searchbar = document.querySelector('ion-searchbar');
    searchbar.style.display = "none";
    this.loadData(searchbar);
    /*searchbar.addEventListener('ionFocus', handleFocus);
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
    }*/
  }

  searchModalEvent(){
    this.modalCtrol.create({
      component: ArticleSearchPagePage,
      
    }).then(modalres => {
      modalres.present();
      modalres.onDidDismiss().then(res => {
        console.log("cover modal dismiss!");
      })

    })
  }

  editModeOnchange(state) {
    this.editMode = state;
  }
  async enterEditMode() {
    this.editModeOnchange(true);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: '',
      message: "You can add and remove \"article cards\" here. To exit, click the exit button on the top left corner.",
      buttons: ['Ok']
    });
    await alert.present();
  }

  async exitEditMode() {
    this.editModeOnchange(false);
    // const alert = await this.alertController.create({
    //   cssClass: 'my-custom-class',
    //   message: 'Do you want to exit Edit Mode? All unsaved changes will be lost.',
    //   buttons: ['Cancel', 'Yes']
    // });
    // await alert.present();
    // const { role } = await alert.onDidDismiss();
    // if (role == "cancel") {
    //   console.log("cancel!");
    // } else {
    //   this.contentLoading();
    // }
  }

  async saveEditMode() {
    //deprecated method
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
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
      loading.present();  // present loading animation

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

