import { Component, Input } from '@angular/core';
import { ModalController,AlertController  } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss'],
})
export class FeedbackModalComponent {
  feedbackForm: FormGroup;
  constructor(private fb: FormBuilder, 
    public modalController: ModalController,
    public alertController: AlertController) {
    this.createForm();
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
    this.feedbackForm.reset();
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      feedback:''
    });
    
  }
  ngOnInit(){
    // const button = document.querySelector('#userSubmit');
    // button.addEventListener('click', this.presentAlert);


  }
  onSubmit() {
    // alert(this.feedbackForm.value);
    console.log(this.feedbackForm.value);
    
    this.presentAlert();
    
  }
  
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  

}
