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
  selectionList: any;
  constructor(
    public modalController: ModalController,
    public firebaseService: FirebaseService,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) {
    this.getSections();
    
  }

  getSections() {
    const subscription = this.firebaseService.getSectionList().subscribe((res) => {
      this.selectionList = res.map(e => {
        return {
          sectionName: e.payload.doc.data()['sectionName'],
        }
      })
      /* console.log(this.sections); */
    }, (err: any) => {
      console.log("Get section list error")
    })

    if (this.selectionList != null) {
      subscription.unsubscribe();
    }



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

  async save() {
    console.log('save changes to cloud!',this.ecoId);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want to save all the changes to cloud?',
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
      this.firebaseService.updateEcoSolutionService(this.ecoId, this.solutionDetail).then((res: any) => {
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

  ngOnInit() {
    this.loadData(this.ecoId);
  }

  dismissModal() {
    this.modalController.dismiss();
  }


}
