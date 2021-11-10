import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss'],
})
export class FeedbackModalComponent {
  feedbackForm: FormGroup;
  constructor(private fb: FormBuilder, public modalController: ModalController) {
    this.createForm();
  }
  createForm(){
    this.feedbackForm = this.fb.group({
      feedback:''
    });
    
  }

  onSubmit() {
    alert(this.feedbackForm.value);
    console.log(this.feedbackForm.value);
    this.feedbackForm.reset();
  }
  
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
