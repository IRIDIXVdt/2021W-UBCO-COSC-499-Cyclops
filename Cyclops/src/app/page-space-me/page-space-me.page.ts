import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { ModalController } from '@ionic/angular';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';


@Component({
  selector: 'app-page-space-me',
  templateUrl: './page-space-me.page.html',
  styleUrls: ['./page-space-me.page.scss'],
})
export class PageSpaceMePage implements OnInit {


  constructor(public popover: PopoverController, public modalController: ModalController, private modalCtrol: ModalController) { }

  async notifications(event) {
    const popover = await this.popover.create({
      event,
      component: PopoverComponent,
      animated: true,
      showBackdrop: false,
    });
    return await popover.present();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: FeedbackModalComponent,
    });
    return await modal.present();
  }


  ngOnInit() {

    
  }

  openModal(){
    this.modalCtrol.create({
      component:EditModalComponent,
    
    }).then(modalres =>{
      modalres.present();

    })
  }

}
