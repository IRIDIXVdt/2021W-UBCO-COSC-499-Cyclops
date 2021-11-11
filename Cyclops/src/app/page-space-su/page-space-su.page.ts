import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { EcoPopoverComponent } from './eco-popover/eco-popover.component';
import { ScoreModalComponent } from './score-modal/score-modal.component';



@Component({
  selector: 'app-page-space-su',
  templateUrl: './page-space-su.page.html',
  styleUrls: ['./page-space-su.page.scss'],
})
export class PageSpaceSuPage implements OnInit {
  profile = {
    solution: "Solution 1",
    score : 0
  }
  
  constructor(public ecopopover:PopoverController, private modalCtrol: ModalController) {}


  async notifications(ev: any) {  
    const popover = await this.ecopopover.create({  
        component: EcoPopoverComponent,  
        event: ev,  
        translucent: true
    });  
    return await popover.present(); 
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
    

   // const data = await modal.onWillDismiss();
    //const data1 = await modal.onWillDismiss();
    //const data2 = await modal.onWillDismiss();

   // console.log(data);

  

  
  



}

