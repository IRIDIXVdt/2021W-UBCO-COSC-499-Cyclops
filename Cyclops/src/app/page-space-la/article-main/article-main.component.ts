import { Component, OnInit, Input } from '@angular/core';
import { displayArticle } from '../../sharedData/displayArticle';
import { displayArticles } from '../../sharedData/displayArticles';
import { ArticleModalMainComponent } from '../article-modal-main/article-modal-main.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-article-main',
  templateUrl: './article-main.component.html',
  styleUrls: ['./article-main.component.scss'],
})
export class ArticleMainComponent implements OnInit {
  // @Input()
  // articleComponent: displayArticle[];
  // @Input()
  // inputArticleId: number;
  @Input()
  columNumber: number;

  contents: displayArticle[] = displayArticles;
  constructor(
    private modalCtrol: ModalController,
  ) {

  }

  ngOnInit() { }

  openNewTextEdit(articleId: number){
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
        if(res.data == "remove content"){
          
          this.contents[articleId].columnName = -1;
        }else if (res.data != null) {
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
