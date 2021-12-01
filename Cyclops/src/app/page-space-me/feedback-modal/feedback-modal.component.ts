import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from './feedback';
@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss'],
})
export class FeedbackModalComponent {
  feedbackForm: FormGroup;
  feedback: Feedback;
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

  createForm() {
    this.feedbackForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [''],
      email: [''],
      agree: false,
      contactType: 'Email',
      content: ['', [Validators.required]]
    });
    this.feedbackForm.get('agree').valueChanges.subscribe(agreeValue => {
      if (agreeValue === true) {
        console.log(' first email required now');//if true, first set validator of email as required for the default option
        this.feedbackForm.get('email').setValidators(Validators.required);
        this.feedbackForm.get('contactType').valueChanges.subscribe(contactValue => {
          console.log('mark all fields as untouched whenever there is a contact value change');
          this.feedbackForm.get('email').markAsUntouched();
          this.feedbackForm.get('phoneNumber').markAsUntouched();
          if (contactValue === 'Email') {
            console.log('add validator to email and remove phone validator');
            this.feedbackForm.get('email').setValidators(Validators.required);
            this.feedbackForm.get('phoneNumber').clearValidators();
            this.feedbackForm.get('phoneNumber').updateValueAndValidity();
          } else if (contactValue === 'Phone') {
            console.log('add validator to phone and remove email validator');
            this.feedbackForm.get('phoneNumber').setValidators(Validators.required);
            this.feedbackForm.get('email').clearValidators();
            this.feedbackForm.get('email').updateValueAndValidity();
          } else if (contactValue === 'Both') {
            console.log('add validator to email and phone validator');
            this.feedbackForm.get('email').setValidators(Validators.required);
            this.feedbackForm.get('phoneNumber').setValidators(Validators.required);
          }
        });
      } else if (agreeValue === false) {
        console.log('both email and number validator cleared ')
        this.feedbackForm.get('email').clearValidators();
        this.feedbackForm.get('email').updateValueAndValidity();
        this.feedbackForm.get('phoneNumber').clearValidators();
        this.feedbackForm.get('phoneNumber').updateValueAndValidity();
      }
    });
  }


  ngOnInit() {

  }

  onSolution() {
    if (!this.feedbackForm.valid) {
      console.log('All fields are required.')
      this.presentErrorAlert();
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
