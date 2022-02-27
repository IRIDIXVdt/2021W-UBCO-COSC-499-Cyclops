import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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
    public alertController: AlertController,
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
        console.log("modal dismiss!");
        // this.alertMess("Changes are all saved *locally*. To upload changes to the database, click the save button on the top right corner of the screen.");
      })

    })
  }
  async alertMess(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: '',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
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