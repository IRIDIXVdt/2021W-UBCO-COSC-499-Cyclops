import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import{AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AuthService } from "./authentication/auth/auth.service";
import { DisplayFeedbackDetailsPage } from './userProfile/display-feedback-details/display-feedback-details.page';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
     BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule, 
     AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
