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
  articles: content[];
  userId:any;
  userData:any;
  latestRead:any;
  pagePosition:any;
  segment:any;

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
    this.authService.afAuth.onAuthStateChanged(user=> {
      if (user) {
        console.log('logged in:',user.uid);
        this.userId=user.uid;
        this.loadUserLatesReadsById();
      } else{
        this.userId=undefined;
        console.log('logged out, userId: ',this.userId);
      }
    });
  }


  ngOnInit() {
    
  }
  loadUserLatesReadsById() {
    console.log("run loadUserById() for latest read");
    const subscription = this.firebaseService.getUserDataByIdService(this.userId).subscribe(
      e => {
        if(e.payload.data()['latestRead']!=undefined){
          this.userData = e.payload.data()['latestRead'];
        }
        subscription.unsubscribe();
        console.log('this user latest rad content loaded:', this.userData.id);
        this.latestRead=this.userData.id;
        console.log(this.latestRead);
        this.pagePosition=this.userData.depth;
        this.segment=this.userData.segment;
        //after subscription closed and segment content has been loaded, scrollbar can be checked
        if(this.userId==null||this.userId==undefined){
          console.log('unsubscribing readArticles');
          subscription.unsubscribe();
        }
      },
      err => {
        console.debug(err);
      }
    )

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

type content={
  docId: string,
  image: string,
  title: string,
  subtitle: string,
  cardIntroduction: string
}




