import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';

@Component({
  selector: 'app-article-image',
  templateUrl: './article-image.page.html',
  styleUrls: ['./article-image.page.scss'],
})
export class ArticleImagePage implements OnInit {
  articleId: string;
  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
    public firebaseService: FirebaseService,
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) {
    this.articleId = this.navParams.data.content;//fetch id from database
  }

  ngOnInit() {
  }
  async clickImageEvent(name) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();  // present loading animation
    const contents = {
      image: name,
    }
    //set changes to local
    this.firebaseService.updateDataByIdService(this.articleId, contents).then((res: any) => {
      console.log("Changes saved to cloud!", res);//log success mesage to console
      this.alertMess("Card Cover Change Success");//tell the user the success message
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
  async alertMess(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: '',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }
  dismissModal() {
    this.modalController.dismiss();
  }

  listP = [
    '../assets/climate.jpg',
    '../assets/crowd.jpg',
    '../assets/effec.jpg',
    '../assets/field.jpg',
    '../assets/fog.jpg',
    '../assets/hope.jpg',
    '../assets/mine.jpg',
    '../assets/money.jpg',
    '../assets/pexels-eriks-cistovs-10002691.jpg',
    '../assets/pexels-freestocksorg-839462.jpg',
    '../assets/pexels-jaime-reimer-2662116.jpg',
    '../assets/pexels-juan-nino-9824355.jpg',
    '../assets/pexels-juliano-ferreira-9467288.jpg',
    '../assets/pexels-pixabay-34107.jpg',
    '../assets/pic_activist.jpg',
    '../assets/pic1.jpg',
    '../assets/pic10.jpg',
    '../assets/pic2.jpg',
    '../assets/pic3.jpg',
    '../assets/pic4.jpg',
    '../assets/pic5.jpg',
    '../assets/pic6.jpg',
    '../assets/pic7.jpg',
    '../assets/pic8.jpg',
    '../assets/pic9.jpg',
    '../assets/plastic.jpg',
    '../assets/pollution.jpg',
    '../assets/renew.jpg',
    '../assets/resp.jpg',
    '../assets/shapes.svg',
    '../assets/test.jpg',
    '../assets/tools.jpg',
    '../assets/toxic_waste.jpg',
    '../assets/waterbody.jpg'];
}
