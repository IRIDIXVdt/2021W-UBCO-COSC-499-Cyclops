import { Component, OnInit, Input } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';
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
    public loadingController: LoadingController,
    public firebaseService: FirebaseService,
  ) { }
  ngOnInit() { }

  async articleRemoveEvent(aIndex: number, content: fetchArticle) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want to remove this article card along with all its content? This action cannot be undone.',
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

      console.log("remove", aIndex);
      this.contentCol.splice(aIndex, 1);//remove locally
      this.firebaseService.deleteDocByIdService("articles", content.id).then((res: any) => console.log(res, " ", content.id),
        (err: any) => { console.log(err); loading.dismiss(); });//remove remotelly
      loading.dismiss();
    }


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