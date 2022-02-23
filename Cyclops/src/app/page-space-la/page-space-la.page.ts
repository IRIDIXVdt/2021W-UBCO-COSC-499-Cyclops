import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FirebaseService } from '../FirebaseService/firebase.service';
import { displayArticle, segmentItem } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';
import { AuthService } from '../authentication/auth/auth.service';

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
    public firebaseService: FirebaseService,
    public authService: AuthService) {
    this.status1 = "Articles p1";
    if (this.authService.isLogin()) {
      this.userId = JSON.parse(localStorage.getItem('user'))['uid'];
    }
  }

  async loadData(searchbarComponent: HTMLElement) {
    // loadData loads all article information into the searchField Component
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
      console.log("Search Field Loaded");
      console.log(this.searchField);

      searchbarComponent.style.display = "block";
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

