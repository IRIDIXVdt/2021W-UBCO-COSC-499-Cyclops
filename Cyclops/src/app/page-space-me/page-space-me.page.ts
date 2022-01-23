import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { ModalController } from '@ionic/angular';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { ActivatedRoute } from '@angular/router';
import { displayArticle } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-page-space-me',
  templateUrl: './page-space-me.page.html',
  styleUrls: ['./page-space-me.page.scss'],
})
export class PageSpaceMePage implements OnInit {

  //contents: displayArticle[] = displayArticles;
  contents:any;
  docId='mzV9kW2MvD4qINJD8J4p';
  feedback = {
    content: ""
  }
  constructor(
    public popover: PopoverController,
    public modalController: ModalController,
    private modalCtrol: ModalController,
    private activatedrouter: ActivatedRoute,
    public firebaseService: FirebaseService
  ) {

    this.docId = this.activatedrouter.snapshot.paramMap.get('docId');
    console.log("docid------",this.activatedrouter.snapshot.paramMap.get('docId'));
    this.loadDataById();
  }

  loadDataById(){
    this.firebaseService.getDataByIdService(this.docId).subscribe(
      res => {
        this.contents= { 
          
          image:res.payload.data()['image'],
          title:res.payload.data()['title'],
          segment:res.payload.data()['segment']        
        
        };

        console.log(this.contents);
      },
      err => {
        console.debug(err);
      }
    )
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
      componentProps: {
        // send data to modal
        id: this.docId,
        title: this.contents.title,
        subtitle: this.contents.subtitle,
        image: this.contents.image,
        segment: JSON.parse(JSON.stringify(this.contents.segment)) 
       
      }
    }).then(modalres => {
      modalres.present();

      modalres.onDidDismiss().then(res => {
        if (res.data != null) {
         /*  this.contents[this.articleId] = res.data; */
          this.contents.title = res.data.title;
          this.contents.subtitle = res.data.subtitle;
          this.contents.image = res.data.image;
          this.contents.segment = res.data.segment;
          //update data here
          console.log("have data"+this.contents[this.docId]);
          console.log(res.data);
        }else{
          console.log("no data ");
          console.log(res.data);
        }
      })

    })
  }

}
