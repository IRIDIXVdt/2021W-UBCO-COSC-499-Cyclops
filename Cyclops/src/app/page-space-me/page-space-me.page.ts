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

  //contents = displayArticles[0];
 

  // contents= {
  //   id: '',
  //   title: '',
  //   subtitle: '',
  //   image: '',
  //   segment: [{
  //     segmentBody:'',
  //     segmentTitle:''

  //   },{
  //     segmentBody:'',
  //     segmentTitle:''
  //    }],
  //   cardIntroduction: '',
  //   columnName: '',
  // }
  contents :any;
  docId:any;
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
    //console.log("docid------",this.activatedrouter.snapshot.paramMap.get('docId'));
    this.loadDataById();
  }

  loadDataById(){
    this.firebaseService.getDataByIdService(this.docId).subscribe(
      e => {
        this.contents= { 
          
          /* image:e.payload.data()['image'],
          title:e.payload.data()['title'],
          subtitle:e.payload.data()['subtitle'],
          segment:e.payload.data()['segment']  */
          
          id: e.payload.data()['id'],
          title: e.payload.data()['title'],
          subtitle:e.payload.data()['subtitle'],
          image: e.payload.data()['image'],
          segment: e.payload.data()['segment'],
          cardIntroduction: e.payload.data()['cardIntroduction'],
          columnName: e.payload.data()['columnName'],
        
        };

        console.log(this.contents);
      },
      err => {
        console.debug(err);
      }
    )
   }

  updateDataById(docId,data){
    this.firebaseService.updateDataByIdService(docId,data).then((res:any) => {
      console.log(res);
    })
  
    alert("scussess");
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
          this.updateDataById(this.docId,this.contents)
        }else{
          console.log("no data ");
          console.log(res.data);
        }
      })

    })
  }

}
