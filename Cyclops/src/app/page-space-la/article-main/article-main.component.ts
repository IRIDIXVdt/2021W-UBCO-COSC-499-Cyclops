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
  @Input()
  articleComponent: displayArticle[];

  contents: displayArticle[] = displayArticles;
  constructor(
    private modalCtrol: ModalController,
  ) {

  }

  ngOnInit() { }

  openCardModal(articleId: number) {
    // console.log("try edit activated");
    console.log(this.articleComponent[articleId].title);
    this.modalCtrol.create({
      component: ArticleModalMainComponent,
      componentProps: {
        id: articleId,
        title: this.contents[articleId].title,
        subtitle: this.contents[articleId].subtitle,
        image:this.contents[articleId].image,
        cardIntroduction: this.contents[articleId].cardIntroduction
      }
    }).then(modalres => {
      modalres.present();

      modalres.onDidDismiss().then(res => {
        if (res.data != null) {
          this.articleComponent[articleId] = res.data;
        } else {
          console.log("no data ");
        }
      })

    })
  }
}
