import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';

@Component({
  selector: 'app-eco-add',
  templateUrl: './eco-add.page.html',
  styleUrls: ['./eco-add.page.scss'],
})
export class EcoAddPage implements OnInit {
  solutionDetail: any;
  constructor(
    public modalController: ModalController,
    public firebaseService: FirebaseService,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) {


  }

  ngOnInit() {
    this.solutionDetail = {
      name: 'solution name',
      detail: 'detail information',
      section: 'test section',
      star: 0,
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }
  save() {
    console.log('save to cloud');
  }

}
