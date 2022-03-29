import { Component, OnInit, Input } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';

@Component({
  selector: 'app-eco-edit',
  templateUrl: './eco-edit.page.html',
  styleUrls: ['./eco-edit.page.scss'],
})
export class EcoEditPage implements OnInit {
  @Input() ecoId: string;
  solutionDetail: any;
  constructor(
    public modalController: ModalController,
    public firebaseService: FirebaseService,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) {
   
  }

  loadData(targetId) {
    this.firebaseService.getEcoSolutionByIdService(targetId).subscribe(
      e => {
        this.solutionDetail = {
          name: e.payload.data()['name'],
          detail: e.payload.data()['detail'],
          section: e.payload.data()['section'],
          star: e.payload.data()['star'],
        };
        // console.log('solution content', this.solutionDetail);
      },
      err => {
        // console.debug(err);
        this.alertMess(err);
      }
    )
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

  save(){
    console.log('save changes to cloud!');
  }

  ngOnInit() {
    this.loadData(this.ecoId);
  }

  dismissModal() {
    this.modalController.dismiss();
  }


}
