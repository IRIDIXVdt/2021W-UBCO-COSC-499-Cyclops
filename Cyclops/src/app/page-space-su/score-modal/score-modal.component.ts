import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { SolutionPageForm } from '../form/solution.page.form';

@Component({
  selector: 'app-score-modal',
  templateUrl: './score-modal.component.html',
  styleUrls: ['./score-modal.component.scss'],
})
export class ScoreModalComponent implements OnInit  {

  myForm: FormGroup;
  submitted = false;



  usereco: any = {};


  //@Input() solution: string;
 // @Input() score: number;
  //@Input() totalscore: number;
  //scoreInput = new FormControl('', Validators.required);
  //taskInput = new FormControl('', Validators.required);
  

  constructor(private modalCtrl: ModalController, private navParams: NavParams, public formBuilder: FormBuilder) { 

  

    this.usereco = this.navParams.data;

    
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      task: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      score: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(100), Validators.min(0)]],
      task1: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      score1: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(100), Validators.min(0)]]
    });
  }
  
  dismissModal() {
    this.modalCtrl.dismiss();

  }
  get errorCtr() {
    return this.myForm.controls;
  }

  

  



  onSolution(){

    this.submitted = true;
    if (!this.myForm.valid) {
      console.log('All fields are required.')
      return false;
    } else {
      this.modalCtrl.dismiss(this.usereco)
    }

    


    
    
   

   //const totals = this.totalscore + this.scoreInput.value;
   //const sol = this.taskInput.value;
   //const sc = this.scoreInput.value;

   //this.modalCtrl.dismiss(totals);
   //this.modalCtrl.dismiss(sol);
   //this.modalCtrl.dismiss(sc);

   

   

  }

}
