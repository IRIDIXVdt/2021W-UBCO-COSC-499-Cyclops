import { Component } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Feedback, ContactType } from './feedback';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';
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
    public alertController: AlertController,
    public firebaseService: FirebaseService,
    public loadingController: LoadingController) {
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
    //space validator
    public spaceValidator(control: FormControl) {
      const isEmptyspace = (control.value || '').trim().length === 0;
      const isValid = !isEmptyspace;
      return isValid ? null : { 'emptyspace': true };
  
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
  private emailValidators = [
    Validators.email,
    Validators.required
  ];
  private phoneValidators = [
    Validators.pattern('^[0-9]*$'),
    Validators.minLength(5),
    Validators.maxLength(12),
    Validators.required
  ];


  createForm() {
    this.feedbackForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, this.spaceValidator]),
      lastName: new FormControl('', [Validators.required, this.spaceValidator]),
      phoneNumber: [''],
      email: [''],
      agree: false,
      contactType: 'Email',
      content: new FormControl('', [Validators.required, this.spaceValidator])
    });
    this.feedbackForm.get('agree').valueChanges.subscribe(agreeValue => {
      if (agreeValue === true) {
        //if agreed, first set validator of email as required for the default option
        this.feedbackForm.get('email').setValidators(this.emailValidators);
        this.feedbackForm.get('contactType').valueChanges.subscribe(contactValue => {
          //mark all fields as untouched whenever there is a contact value change
          this.feedbackForm.get('email').markAsUntouched();
          this.feedbackForm.get('phoneNumber').markAsUntouched();
          if (contactValue === 'Email') {
            //add validator to email and remove phone validator
            this.feedbackForm.get('email').setValidators(this.emailValidators);
            this.feedbackForm.get('phoneNumber').clearValidators();
            this.feedbackForm.get('phoneNumber').updateValueAndValidity();
          } else if (contactValue === 'Phone') {
            //add validator to phone and remove email validator
            this.feedbackForm.get('phoneNumber').setValidators(this.phoneValidators);
            this.feedbackForm.get('email').clearValidators();
            this.feedbackForm.get('email').updateValueAndValidity();
          } else if (contactValue === 'Both') {
            console.log('add validator to email and phone validator');
            this.feedbackForm.get('email').setValidators(this.emailValidators);
            this.feedbackForm.get('phoneNumber').setValidators(this.phoneValidators);
          }
        });
      } else if (agreeValue === false) {
        //both email and number validator cleared when agree is false
        this.feedbackForm.get('email').clearValidators();
        this.feedbackForm.get('email').updateValueAndValidity();
        this.feedbackForm.get('phoneNumber').clearValidators();
        this.feedbackForm.get('phoneNumber').updateValueAndValidity();
      }
    });
  }


  ngOnInit() {

  }

  async onSolution() {
    if (!this.feedbackForm.valid) {
      console.log('All fields are required.')
      this.presentErrorAlert();
      return false;
    } else {
      this.feedback = this.feedbackForm.value;
      await this.storeFeedback(this.feedback)
     
    }

  }

  feedbackData = {
    agree: true,
    contactType: "",
    content: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "" ,
    userUid:''
  }

  async storeFeedback(data){
    this.feedbackData.agree = data.agree;
    this.feedbackData.contactType = data.contactType;
    this.feedbackData.content = data.content;
    this.feedbackData.email = data.email;
    this.feedbackData.firstName = data.firstName;
    this.feedbackData.lastName = data.lastName;
    this.feedbackData.phoneNumber = data.phoneNumber;
    this.feedbackData.userUid = JSON.parse(localStorage.getItem('user')).uid;

    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present(); 

    this.firebaseService.addDataService('feedback',this.feedbackData).then((res: any) => {
      loading.dismiss();
      console.log(res);
      /* console.log(this.feedback); */
      this.feedbackForm.reset();
      this.presentCompleteAlert();
      this.modalController.dismiss();
    }).catch((error) => {
      loading.dismiss();
      console.log(error);
      this.errorAlert('Failed to submit','Check your internet connection')
      
    })

  }

  async errorAlert(header,message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header:header,
      subHeader: '',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }


/*   agree: true
contactType: "Email"
content: "asdasd"
email: "970849953@qq.com"
firstName: "sad"
lastName: "asdas"
phoneNumber: "" */

  dismissModal() {
    this.modalController.dismiss();
  }


}
