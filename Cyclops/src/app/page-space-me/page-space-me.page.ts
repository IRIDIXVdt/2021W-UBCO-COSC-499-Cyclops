import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { ModalController } from '@ionic/angular';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { ActivatedRoute } from '@angular/router';
import { displayArticle } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';

@Component({
  selector: 'app-page-space-me',
  templateUrl: './page-space-me.page.html',
  styleUrls: ['./page-space-me.page.scss'],
})
export class PageSpaceMePage implements OnInit {

  contents: displayArticle[] = displayArticles;
  articleId;
  feedback = {
    content: ""
  }
  constructor(
    public popover: PopoverController,
    public modalController: ModalController,
    private modalCtrol: ModalController,
    private activatedrouter: ActivatedRoute
  ) {

    this.articleId = this.activatedrouter.snapshot.paramMap.get('id');
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
 /* async presentModal() {
    const modal = await this.modalController.create({
      component: FeedbackModalComponent,
    });
    return await modal.present();
  }*/
  
  presentModal(){
    this.modalCtrol.create({
      component:FeedbackModalComponent,
      componentProps: this.feedback
    }).then(modalres =>{
      modalres.present();

      modalres.onDidDismiss().then( res =>{
        if(res.data != null){
          this.feedback = res.data;
        }
      })
    })
  }

  ngOnInit() {
  }

  openModal() {
    this.modalCtrol.create({
      component: EditModalComponent,
      componentProps: this.contents[this.articleId]
    }).then(modalres => {
      modalres.present();

      modalres.onDidDismiss().then(res => {
        if (res.data != null) {
          this.contents[this.articleId] = res.data;
        }
      })

    })
  }

}
