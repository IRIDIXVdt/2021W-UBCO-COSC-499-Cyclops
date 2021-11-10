import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { EcoPopoverComponent } from '../eco-popover/eco-popover.component';



@Component({
  selector: 'app-progress-indicators',
  templateUrl: './progress-indicators.component.html',
  styleUrls: ['./progress-indicators.component.scss'],
})
export class ProgressIndicatorsComponent implements OnInit {

  constructor(public ecopopover:PopoverController) {}

  currentTask="Solution 1";
  currentScore="0";
  

  async notifications(ev: any) {  
    const popover = await this.ecopopover.create({  
        component: EcoPopoverComponent,  
        event: ev,  
        translucent: true
    });  
    return await popover.present(); 
  }
  ngOnInit() {}

  getTask(task){
    console.warn(task)
    this.currentTask=task
  }
  getScore(score){
    console.warn(score)
    this.currentScore= score
  }

  



}
