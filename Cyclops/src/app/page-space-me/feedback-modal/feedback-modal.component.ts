import { Component, Input } from '@angular/core';
import { ModalController,AlertController, NavParams   } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss'],
})
export class FeedbackModalComponent {
  feedbackForm: FormGroup;
  submitted = false;
  userfeedback: any = {};

  constructor(private fb: FormBuilder, 
    public modalController: ModalController,
    public alertController: AlertController,
    private navParams: NavParams) {
    this.createForm();
    this.userfeedback = this.navParams.data;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Completed',
      subHeader: '',
      message: 'Thank you for your feedback.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      feedback:''
    });
    
  }
  ngOnInit(){
    this.feedbackForm = this.fb.group({
      feedback: ['', Validators.required],
    });


  }
  onSubmit() {
    // alert(this.feedbackForm.value);
    console.log(this.feedbackForm.value);
    
    
    
  }
  onSolution(){
    this.submitted = true;
    if (!this.feedbackForm.valid) {
      console.log('All fields are required.')
      return false;
    } else {
      this.feedbackForm.reset();
      this.presentAlert();
      this.modalController.dismiss(this.userfeedback)
    }

  }
  
  /*dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }*/

  dismissModal() {
    this.modalController.dismiss();

  }
  get errorCtr() {
    return this.feedbackForm.controls;
  }

  

}
