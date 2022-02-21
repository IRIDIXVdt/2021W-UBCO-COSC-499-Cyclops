import { Component, HostListener, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';


import { NgZone } from '@angular/core';
import { FirebaseService } from '../FirebaseService/firebase.service';
import { AuthService } from '../authentication/auth/auth.service';
@Component({
  selector: 'app-page-space-er',
  templateUrl: './page-space-er.page.html',
  styleUrls: ['./page-space-er.page.scss'],
})
export class PageSpaceErPage implements OnInit {
  isDesktop: boolean;
  //contents: displayArticle[] = displayArticles;
  articles: any;

  survey: any;

  authentication: boolean; // validate user is logged in or not 

  fButtons = [ // false: have not logged in authentication = false.   true: already Logged in 
    { iconName: "log-in-outline", routerLink: "/login", clickMethod: "", isActive: false },
    { iconName: "remove-circle-outline", routerLink: "", clickMethod: "authService.SignOut()", isActive: true },
    { iconName: "person-circle-outline", routerLink: "", clickMethod: "", isActive: true }
  ];



  constructor(
    public firebaseService: FirebaseService,
    // private screensizeService: ScreensizeService,
    private platform: Platform,
    public authService: AuthService,
    private zone: NgZone) {
    console.log("constructor run");
    this.loadData();
    this.loadSurveyData();

    if(authService.userData){
      console.log("Has User",authService.isLogin())
    }else{
      console.log("No User",authService.isLogin())
    }
  }


  ngOnInit() {

  }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  async loadData() {
    console.log("run loadData");
    this.firebaseService.getDataServiceMainPage().subscribe((res) => {
      this.articles = res.map(e => {
        return {
          docId: e.payload.doc.id,
          image: e.payload.doc.data()['image'],
          title: e.payload.doc.data()['title'],
          subtitle: e.payload.doc.data()['subtitle'],
          cardIntroduction: e.payload.doc.data()['cardIntroduction']
        }
      })
      console.log(this.articles);
    }, (err: any) => {
      console.log(err);
    })
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


}
