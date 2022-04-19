import { Component, OnInit, Input } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';
import { segmentItem } from '../../sharedData/displayArticle';
import { ArticleEditPagePage } from '../article-edit-page/article-edit-page.page';
// import { ArticleEditComponent } from '../article-edit/article-edit.component';
import { AuthService } from '../../authentication/auth/auth.service';
import { ArticleImagePage } from '../article-image/article-image.page';

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
    public authService: AuthService,
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
    if (role == "cancel" || role == "backdrop") {
      console.log("cancel!");
    } else {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
      loading.present();  // present loading animation

      console.log("remove", aIndex);
      this.contentCol.splice(aIndex, 1);//remove locally
      this.firebaseService.deleteDocByIdService("articles", content.id).then((res: any) => {
        console.log(res, " ", content.id)
        this.removeUserReadArticles(content.id);
      }, (err: any) => {
        console.log(err); loading.dismiss();
      });//remove remotelly
      loading.dismiss();
    }
  }

  async removeUserReadArticles(docId) {
    let users = this.firebaseService.getAllUsersDataService();
    let segments: any[] = [];

    (await users).forEach((userDoc) => {
      console.log(userDoc.data());
      console.log(docId);
      segments = userDoc.data()['readArticles'];
      for (let i = 0; i < segments.length; i++) {
        console.log(segments[i].id);
        if (segments[i].id == docId) {
          segments.splice(i, 1);
          console.log('spliced');
          break;
        }
        
      }
      console.log(segments);
      this.firebaseService.updateUserCollectionDataByIdService(userDoc.id, { readArticles: segments });
      /*let segmentRead = Array(segmentLength).fill(false);
      
      segments.push(newData);
      */

    });
  }

  articleAddEvent() {
    console.log("add new artciel to col", this.contentCol);
    const newArticle: fetchArticle = {
      id: "",
      title: 'New Card Title',
      subtitle: '',
      image: '../assets/pic' + this.getRandomInt(1, 9) + '.jpg',
      cardIntroduction: 'New Card Introduction',
      columnName: this.col,
      segment: [{
        segmentTitle: "Sample Title",
        segmentBody: `<p>Sample Body</p>`
      }, {
        segmentTitle: "Sample Title",
        segmentBody: `<p>Sample Body</p>`
      }]
    }
    this.contentCol.push(newArticle);
    //update all user profiles read article tracker with new article
    this.firebaseService.addDataService("articles", newArticle).then((res: any) => {
      console.log(res.id);
      this.addUserReadArticles(res.id, newArticle.segment.length);
    })

  }
  async addUserReadArticles(docId, segmentLength) {
    let users = this.firebaseService.getAllUsersDataService();
    let segments: any[] = [];

    (await users).forEach((userDoc) => {
      console.log(userDoc.data());
      segments = userDoc.data()['readArticles'];
      let segmentRead = Array(segmentLength).fill(false);
      let newData = { id: docId, segment: segmentRead };
      segments.push(newData);
      this.firebaseService.updateUserCollectionDataByIdService(userDoc.id, { readArticles: segments });

    });
  }


  coverEditEvent(aId: string) {
    console.log("cover event", aId);
    this.modalCtrol.create({
      component: ArticleImagePage,
      componentProps: {
        content: aId,
      }
    }).then(modalres => {
      modalres.present();
      modalres.onDidDismiss().then(res => {
        console.log("cover modal dismiss!");
      })

    })
  }

  articleEditEvent(aId: string) {
    console.log("edit event", aId);
    this.modalCtrol.create({
      component: ArticleEditPagePage,
      componentProps: {
        content: aId,
      }
    }).then(modalres => {
      modalres.present();

      modalres.onDidDismiss().then(res => {
        console.log("card modal dismiss!");
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

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
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