import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/authentication/auth/auth.service';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.page.html',
  styleUrls: ['./edit-survey.page.scss'],
})
export class EditSurveyPage implements OnInit {
  survey: any;

  constructor(public authService: AuthService, public firebaseService: FirebaseService,public alertController: AlertController) {
    this.loadSurveyData();
  }

  ngOnInit() {
  }


  async loadSurveyData() {
    console.log("run loadData");
    this.firebaseService.getSurveyService().subscribe((res) => {
      this.survey = res.map(e => {
        return {
          docId: e.payload.doc.id,
          surveyTitle: e.payload.doc.data()['surveyTitle'],
          surveyLink: e.payload.doc.data()['surveyLink'],
        }
      })
      console.log(this.survey);
    }, (err: any) => {
      console.log(err);
    })
  }


  async addSurvey() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Survey',
      inputs: [
        {
          name: 'surveyTitle',
          type: 'text',       
          placeholder: 'Enter Survey Title'
        },
        {
          name: 'surveyLink',
          type: 'textarea',
          autoGrow: "true",
          placeholder: 'Enter Survey Link'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },{
          text: 'Save',
          handler: data => {
            if (true) {
              console.log("run-------------")



            } else {

            }
          }
        }
      ]
    });/*  */

    await alert.present();

  }



}

  


