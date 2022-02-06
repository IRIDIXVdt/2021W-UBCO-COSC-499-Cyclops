import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { EcoPopoverComponent } from './eco-popover/eco-popover.component';
import { ScoreModalComponent } from './score-modal/score-modal.component';
import { StarModalComponent } from './star-modal/star-modal.component';
import { NavController } from '@ionic/angular';
import { PageSpaceMePage } from '../page-space-me/page-space-me.page';
import { Router } from '@angular/router';



@Component({
  selector: 'app-page-space-su',
  templateUrl: './page-space-su.page.html',
  styleUrls: ['./page-space-su.page.scss'],
})
export class PageSpaceSuPage implements OnInit {

  profile = {
    solution: "Solution",
    score : 0,

    solution1:"Solution",
    score1: 0
  }

  surveyPage: PageSpaceMePage;
  
  constructor(public ecopopover:PopoverController, private modalCtrol: ModalController, public navCtrl: NavController, private router: Router) {}


  async notifications(ev: any) {  
    const popover = await this.ecopopover.create({  
        component: EcoPopoverComponent,  
        event: ev,  
        translucent: true
    });  
    return await popover.present(); 
  }
  goSurvey(){
    this.router.navigateByUrl('tabs/page-space-me');
  }




  ngOnInit() {}

  openModal(){
    this.modalCtrol.create({
      component:ScoreModalComponent,
      componentProps: this.profile
    }).then(modalres =>{
      modalres.present();

      modalres.onDidDismiss().then( res =>{
        if(res.data != null){
          this.profile = res.data;
        }
      })
    })
  }
    

   

  

  
  



}

