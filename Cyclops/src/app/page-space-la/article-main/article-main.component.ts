import { Component, OnInit, Input } from '@angular/core';
import { displayArticle } from '../../sharedData/displayArticle';
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

  articleId;
  constructor(
    private modalCtrol: ModalController,
  ) {

  }

  ngOnInit() {}

  openCardModal(articleId:number) {
    // console.log("try edit activated");
    console.log(this.articleComponent[articleId].title);
    // this.modalCtrol.create({
    //   component: ArticleModalMainComponent,
    //   componentProps: {
    //     // id: this.articleId,
    //     // title: this.contents[this.articleId].title,
    //     // subtitle: this.contents[this.articleId].subtitle,
    //     // image: this.contents[this.articleId].image,
    //     // segment: JSON.parse(JSON.stringify(this.contents[this.articleId].segment)) 
       
    //   }
    // }).then(modalres => {
    //   modalres.present();

    //   modalres.onDidDismiss().then(res => {
    //     if (res.data != null) {
    //       this.articleComponent[this.articleId] = res.data;
    //     }else{
    //       console.log("no data ");
    //     }
    //   })

    // })
  }
}
