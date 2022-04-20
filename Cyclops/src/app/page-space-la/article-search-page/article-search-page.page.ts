import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';
import { displayArticle, segmentItem } from 'src/app/sharedData/displayArticle';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-article-search-page',
  templateUrl: './article-search-page.page.html',
  styleUrls: ['./article-search-page.page.scss'],
})
export class ArticleSearchPagePage implements OnInit {
  status1: any;
  dummySearchField: fetchArticle[];
  searchField: fetchArticle[];
  articleCol: fetchArticle[][];
  i: number = 0;
  userInput: string = '';

  constructor(
    public firebaseService: FirebaseService,
    public modalController: ModalController,
  ) { }
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
      console.log("Search Field Loaded", this.searchField);
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

  ngOnInit() {
    const searchbar = document.querySelector('ion-searchbar');
    searchbar.style.display = "none";
    this.loadData(searchbar);
  }
  dismissModal() {
    // console.log("we have the editC now as:", this.editC);
    this.modalController.dismiss();
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

