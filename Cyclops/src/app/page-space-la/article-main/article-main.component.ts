import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { segmentItem } from '../../sharedData/displayArticle';
import { ArticleEditComponent } from '../article-edit/article-edit.component';
@Component({
  selector: 'app-article-main',
  templateUrl: './article-main.component.html',
  styleUrls: ['./article-main.component.scss'],
})
export class ArticleMainComponent implements OnInit {
  @Input() contentCol: fetchArticle[];
  @Input() editMode: boolean;
  @Input() col: string;
  constructor(
    private modalCtrol: ModalController,
  ) { }
  ngOnInit() { }

  articleRemoveEvent(aIndex: number) {
    console.log("remove", aIndex);
    this.contentCol.splice(aIndex, 1);
  }
  articleAddEvent() {
    console.log("add new artciel to col", this.contentCol);
    const newArticle: fetchArticle = {
      id: '',
      title: 'new Title',
      subtitle: '',
      image: '../assets/pic1.jpg',
      cardIntroduction: 'new Introduction',
      columnName: this.col,
      segment: []
    }
    this.contentCol.push(newArticle);
  }
  articleEditEvent(articleContent: fetchArticle) {
    console.log("edit event", articleContent.id);
    this.modalCtrol.create({
      component: ArticleEditComponent,
      componentProps: {
        content: articleContent,
      }
    }).then(modalres => {
      modalres.present();

      modalres.onDidDismiss().then(res => {
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
  columnName: string;
  segment: segmentItem[];
}