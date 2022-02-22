import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/authentication/auth/auth.service';
import { FirebaseService } from 'src/app/FirebaseService/firebase.service';

@Component({
  selector: 'app-edit-survey-details',
  templateUrl: './edit-survey-details.page.html',
  styleUrls: ['./edit-survey-details.page.scss'],
})
export class EditSurveyDetailsPage implements OnInit {
  surveyId:any;
  currentSurvey:any;
  constructor(
    private activatedrouter: ActivatedRoute,
    public authService: AuthService, 
    public firebaseService: FirebaseService,
    public alertController: AlertController,
    public loadingController: LoadingController
    ){
    this.surveyId = this.activatedrouter.snapshot.paramMap.get('id');
    this.loadSurvey(this.surveyId);
    
   }

  ngOnInit() {
    
  }


  loadSurvey(id){
    const subscription = this.firebaseService.getSurveyByIdService(id).subscribe(
      e => {
        this.currentSurvey = {
          surveyTitle: e.payload.data()['surveyTitle'],
          surveyLink: e.payload.data()['surveyLink'],
        };
        subscription.unsubscribe();
        console.log('unsubscribe success, with this content loaded:', this.currentSurvey);
      },
      err => {
        console.debug(err);
      }
    )
  }

  async save(title, link){
    let data ={
      surveyTitle: title,
      surveyLink: link,
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want save the change?',
      buttons: ['Cancel', 'Yes']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role == "cancel") {
      console.log("cancel!");
    } else {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
      loading.present();

      this.firebaseService.updateSurveyByIdService(this.surveyId,data).then((res: any) => {
        loading.dismiss();
        this.alertMessage('Successful!');
        console.log(res);
      }).catch((error) => {
        loading.dismiss();
        this.alertMessage('Failed to save changes, Try again! ');
        console.log("error",error);
      })
    }
    


  }


  async alertMessage(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }

}
