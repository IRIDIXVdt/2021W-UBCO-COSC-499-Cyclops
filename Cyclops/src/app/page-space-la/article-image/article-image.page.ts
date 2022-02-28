import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
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
  ) {
    this.articleId = this.navParams.data.content;//fetch id from database
  }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  listP = [
    '../assets/climate.jpg',
    '../assets/crowd.jpg',
    // '../assets/default-user-image.png',
    '../assets/effec.jpg',
    '../assets/field.jpg',
    '../assets/fog.jpg',
    '../assets/hope.jpg',
    // '../assets/influence.jpg',
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
