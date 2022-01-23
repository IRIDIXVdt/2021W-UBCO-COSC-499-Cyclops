import { Component, OnInit, Input } from '@angular/core';
import { displayArticle } from '../../sharedData/displayArticle';
import { displayArticles } from '../../sharedData/displayArticles';
import { ArticleModalMainComponent } from '../article-modal-main/article-modal-main.component';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-article-main',
  templateUrl: './article-main.component.html',
  styleUrls: ['./article-main.component.scss'],
})
export class ArticleMainComponent implements OnInit {
  @Input()
  columNumber: number;
  contents: fetchArticle[];
  // contents: displayArticle[] = displayArticles;
  contentCol: fetchArticle[];
  i: number = 0;

  constructor(
    private modalCtrol: ModalController,
    public firebaseService: FirebaseService
  ) {
    this.loadData();

  }

  // constructor(public firebaseService: FirebaseService) { this.loadData() }

  async loadData() {
    this.firebaseService.getDataServiceMainPage().subscribe((res) => {
      this.contents = res.map(e => {
        return {
          id: e.payload.doc.id,
          //notice this is not id in the shared folder
          //this is the id generated from Firebase
          image: e.payload.doc.data()['image'],
          title: e.payload.doc.data()['title'],
          subtitle: e.payload.doc.data()['subtitle'],
          cardIntroduction: e.payload.doc.data()['cardIntroduction'],
          columnName: e.payload.doc.data()['columnName']
        }
      })
      console.log("load complete");
      console.log(this.contents);

      this.contentCol = [];
      for (this.i = 0; this.i < this.contents.length; this.i++) {
        const currentArticle = this.contents[this.i];
        if (currentArticle.columnName == this.columNumber) {
          this.contentCol.push(currentArticle);
        }
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  ngOnInit() {

  }

  openNewTextEdit(articleId: number) {
    //this function handles the event of redirecting the app user to the new Editing Page

  }

  openCardModal(articleId: number) {
    // console.log("try edit activated");
    console.log(this.contents[articleId].title);
    this.modalCtrol.create({
      component: ArticleModalMainComponent,
      componentProps: {
        id: articleId,
        title: this.contents[articleId].title,
        subtitle: this.contents[articleId].subtitle,
        // image: this.contents[articleId].image,
        cardIntroduction: this.contents[articleId].cardIntroduction
      }
    }).then(modalres => {
      modalres.present();

      modalres.onDidDismiss().then(res => {
        if (res.data == "remove content") {
          this.contents[articleId].columnName = -1;
        } else if (res.data != null) {
          // this.contents[articleId] = res.data;
          this.contents[articleId].title = res.data.title;
          this.contents[articleId].subtitle = res.data.subtitle;
          this.contents[articleId].cardIntroduction = res.data.cardIntroduction;
          console.log("update res data successful");
        } else {
          console.log("no data ");
        }
      })

    })
  }
}
type fetchArticle = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cardIntroduction: string;
  columnName: number;
}