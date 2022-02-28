import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';
import { segmentItem } from 'src/app/sharedData/displayArticle';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent implements OnInit {
  // @Input() content: fetchArticle;
  // editC: fetchArticle;
  articleId: string;
  contents: editArticle;
  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    private navParams: NavParams,
    public loadingController: LoadingController,
    public firebaseService: FirebaseService,

  ) {
    this.articleId = this.navParams.data.content;//fetch id from database
  }

  ngOnInit() {

  }
  private loadData() {
    this.firebaseService.getDataByIdService(this.articleId).subscribe(
      e => {
        this.contents = {
          title: e.payload.data()['title'],
          subtitle: e.payload.data()['subtitle'],
          image: e.payload.data()['image'],
          cardIntroduction: e.payload.data()['cardIntroduction'],
          columnName: e.payload.data()['columnName'],
        };
        console.log('edit content',this.contents);
      },
      err => {
        console.debug(err);
        this.alertMess("err");
      }
    )
  }
  dismissModal() {
    // console.log("we have the editC now as:", this.editC);
    this.modalController.dismiss();
  }
  onTitleEditorChange() {
    // console.log(this.editTitle);
  }
  async save(t: string, s: string, c: string) {
    // this.alertMess("Changes are all saved *locally*. To upload changes to the database, click the save button on the top right corner of the screen.");
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want to save all the changes to cloud?',
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
      this.contents.title = t;
      this.contents.subtitle = s;
      this.contents.cardIntroduction = c;
      //set changes to local
      this.firebaseService.updateDataByIdService(this.articleId, this.contents).then((res: any) => {
        console.log("Changes saved to cloud!", res);//log success mesage to console
        this.alertMess("Upload Success");//tell the user the success message
        loading.dismiss();//close loading animation
        //local saving
        this.modalController.dismiss();//close modal
        //remote saving complete
      }).catch((error) => {
        loading.dismiss();
        this.alertMess('Failed to save changes, Try again!');
        console.log("error", error);
      })

    }
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
type editArticle = {
  title: string;
  subtitle: string;
  image: string;
  cardIntroduction: string;
  columnName: string;
}
