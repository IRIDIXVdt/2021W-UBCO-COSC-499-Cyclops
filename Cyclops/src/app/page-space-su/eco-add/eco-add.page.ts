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
  selectionList: any;
  constructor(
    public modalController: ModalController,
    public firebaseService: FirebaseService,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  getSections() {

    const subscription = this.firebaseService.getSectionList().subscribe((res) => {
      this.selectionList = res.map(e => {
        return e.payload.doc.data()['sectionName'];
      });
      this.solutionDetail.section = this.selectionList[0];
      console.log(this.selectionList);
    }, (err: any) => {
      console.log("Get section list error")
    })
    if (this.selectionList != null) {
      subscription.unsubscribe();
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


  ngOnInit() {
    this.solutionDetail = {
      name: 'solution name',
      detail: 'detail information',
      section: 'test section',
      star: 0,
    }
    this.getSections();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async save() {
    console.log('save to cloud',this.solutionDetail);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want to save this solution to cloud?',
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


      // this.firebaseService.updateEcoSolutionService(this.ecoId, this.solutionDetail).then((res: any) => {
      //   console.log("Changes saved to cloud!", res);//log success mesage to console
      //   this.alertMess("Upload Success");//tell the user the success message
      //   loading.dismiss();//close loading animation
      //   //local saving
      //   this.modalController.dismiss();//close modal
      //   //remote saving complete
      // }).catch((error) => {
      //   loading.dismiss();
      //   this.alertMess('Failed to save changes, Try again!');
      //   console.log("error", error);
      // })

      this.firebaseService.addDataService("NewEcoSolution", this.solutionDetail).then((res: any) => {
        console.log(res);
        loading.dismiss();
        this.modalController.dismiss();
      }).catch((error) => {
        console.log(error);
        this.alertMess('Failed to save changes, Try again!');
        loading.dismiss();
        this.modalController.dismiss();
      })
    }
  }

}
