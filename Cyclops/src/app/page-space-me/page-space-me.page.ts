import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { ModalController } from '@ionic/angular';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
@Component({
  selector: 'app-page-space-me',
  templateUrl: './page-space-me.page.html',
  styleUrls: ['./page-space-me.page.scss'],
})
export class PageSpaceMePage implements OnInit {
  

  constructor(public popover:PopoverController, public modalController: ModalController) {}

  async notifications(ev: any) {  
    const popover = await this.popover.create({  
        component: PopoverComponent,  
        event: ev,  
        animated: true,  
        showBackdrop: true  
    });  
    return await popover.present(); 
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: FeedbackModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  
  ngOnInit() {
  }

}
