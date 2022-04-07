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

  save() {
    console.log('save to cloud',this.solutionDetail);
  }

}
