import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { EcoPopoverComponent } from '../eco-popover/eco-popover.component';
import { ScoreModalComponent } from '../score-modal/score-modal.component';



@Component({
  selector: 'app-progress-indicators',
  templateUrl: './progress-indicators.component.html',
  styleUrls: ['./progress-indicators.component.scss'],
})
export class ProgressIndicatorsComponent implements OnInit {

  eco = [
    {
      solution: 'Click to Enter Solution',
      score: 0,
      totalscore: 0

    }
  ];



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

  async openModal(){
     const modal = await this.modalCtrol.create({
      component: ScoreModalComponent
    });

    await modal.present();

  }

  
  



}
