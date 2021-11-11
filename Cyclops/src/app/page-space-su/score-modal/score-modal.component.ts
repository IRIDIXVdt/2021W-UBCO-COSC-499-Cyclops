import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-score-modal',
  templateUrl: './score-modal.component.html',
  styleUrls: ['./score-modal.component.scss'],
})
export class ScoreModalComponent  {
  scoreInput = new FormControl('', Validators.required);
  taskInput = new FormControl('', Validators.required);
  

  constructor(private modalCtrl: ModalController) { }

  dismissModal() {
    this.modalCtrl.dismiss();

  }
  onSolution(){
    //console.warn(task)
   // this.currentTask=task
    //console.warn(score)
    //this.currentScore= score

    console.log(this.scoreInput.value);
    console.log(this.taskInput.value);


  }

}
