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
      cssClass: 'addSurvey',
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
            if (data.surveyTitle!='' && data.surveyLink!='') {
              this.firebaseService.addDataService('survey', data).then((res: any) => {
                console.log(res);
              }).catch((error) => {
                console.log("error",error);
        
              })

            } else {
              this.alertError('Can not be empty!');
            }
          }
        }
      ]
    });/*  */

    await alert.present();

  }
  async alertError(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }


  async deleteSurvey(docId){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want delete this survey?',
      buttons: ['Cancel', 'Yes']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role == "cancel") {
      console.log("cancel!");
    } else {
      this.firebaseService.deleteDocByIdService('survey', docId).then((res: any) => {
        console.log(res);
      }).catch((error) => {
        console.log("error",error);
      })
    }
    
  }


}

  


