import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-score-modal',
  templateUrl: './score-modal.component.html',
  styleUrls: ['./score-modal.component.scss'],
})
export class ScoreModalComponent  {

  usereco: any = {};


  //@Input() solution: string;
 // @Input() score: number;
  //@Input() totalscore: number;
  //scoreInput = new FormControl('', Validators.required);
  //taskInput = new FormControl('', Validators.required);
  

  constructor(private modalCtrl: ModalController, private navParams: NavParams) { 

    this.usereco = this.navParams.data;

    
  }

  dismissModal() {
    this.modalCtrl.dismiss();

  }
  onSolution(){
    this.modalCtrl.dismiss(this.usereco)
    
   

   //const totals = this.totalscore + this.scoreInput.value;
   //const sol = this.taskInput.value;
   //const sc = this.scoreInput.value;

   //this.modalCtrl.dismiss(totals);
   //this.modalCtrl.dismiss(sol);
   //this.modalCtrl.dismiss(sc);

   

   

  }

}
