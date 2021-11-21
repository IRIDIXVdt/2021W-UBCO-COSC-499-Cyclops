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
  content={
    title: 'Sample Article',
    intro: 'Here, we’ll explore 2 of the most important aspects of the environmental crisis: climate change and biodiversity loss. We’ll see why mitigating each ‘sub-crisis’ is important for the planet and its millions of species, including humans. This section should provide a solid foundation before exploring additional sections, where we’ll often allude to greenhouse gas emissions and biodiversity loss. This will help readers understand the severity of emissions and toxic pollution, instead of just reading meaningless numbers.'
  }

  constructor(
    public popover: PopoverController, 
    public modalController: ModalController, 
    private modalCtrol: ModalController 
     ) {


   }

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
      componentProps: this.content
    }).then(modalres =>{
      modalres.present();

      modalres.onDidDismiss().then( res =>{
        if(res.data != null){
          this.content = res.data;
        }
      })
    
    })
  }

}
