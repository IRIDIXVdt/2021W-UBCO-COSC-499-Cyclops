import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { segmentItem } from 'src/app/sharedData/displayArticle';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent implements OnInit {
  @Input() content: fetchArticle;
  editC: fetchArticle;

  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    private navParams: NavParams,
  ) {
    this.editC = this.navParams.data.content;
    console.log(this.editC);

  }

  ngOnInit() {
    console.log(this.content);
    // this.editTitle.title = this.content.title
  }
  dismissModal() {
    console.log("we have the editC now as:", this.editC);
    this.modalController.dismiss();
  }
  onTitleEditorChange() {
    // console.log(this.editTitle);
  }
  save(t: string, s: string, c: string) {
    this.editC.subtitle = t;
    this.editC.title = s;
    this.editC.cardIntroduction = c;

    this.content.subtitle = t;
    this.content.title = s;
    this.content.cardIntroduction = c;
   
    this.modalController.dismiss();
    this.alertMess("Changes are all saved *locally*. To upload changes to the database, click the save button on the top right corner of the screen.");
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
