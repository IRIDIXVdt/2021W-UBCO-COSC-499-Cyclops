import { Component} from '@angular/core';
import { ModalController,AlertController} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback , ContactType} from './feedback';
@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss'],
})
export class FeedbackModalComponent {
  feedbackForm: FormGroup;
  feedback:Feedback;
  contactType = ContactType;

  constructor(private fb: FormBuilder, 
    public modalController: ModalController,
    public alertController: AlertController) {
    this.createForm();
  }

  async presentCompleteAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Completed',
      subHeader: '',
      message: 'Thank you for your feedback.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Incomplete form',
      subHeader: '',
      message: 'Please make sure all fields are filled out.',
      buttons: ['OK']
    });
    await alert.present();
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [''],
      email: [''],
      agree: false,
      contactType:'Email',
      content: ['', [Validators.required]]
    });
    this.feedbackForm.get('agree').valueChanges.subscribe(value => {
      if(value) {
        if(this.feedbackForm.get('contactType').value==='Phone'||this.feedbackForm.get('contactType').value==='Both'){
          this.feedbackForm.get('phoneNumber').setValidators(Validators.required);
        }else if(this.feedbackForm.get('contactType').value==='Email'||this.feedbackForm.get('contactType').value==='Both'){
          this.feedbackForm.get('email').setValidators(Validators.required);
        }
      } else {
        this.feedbackForm.get('email').clearValidators();
        this.feedbackForm.get('phoneNumber').clearValidators();
        this.feedbackForm.get('email').updateValueAndValidity();
        this.feedbackForm.get('phoneNumber').updateValueAndValidity();
      }
    });
  }


  ngOnInit(){

   }

  onSolution(){
    if (!this.feedbackForm.valid) {
      console.log('All fields are required.')
      this.presentErrorAlert() ;
      return false;
    } else {
      this.feedback = this.feedbackForm.value;
      console.log(this.feedback);
      this.feedbackForm.reset();
      this.presentCompleteAlert();
      this.modalController.dismiss();
    }

  }
  
  dismissModal() {
    this.modalController.dismiss();
  }
  

}
