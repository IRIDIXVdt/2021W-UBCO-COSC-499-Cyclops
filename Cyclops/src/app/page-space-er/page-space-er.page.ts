import { Component, HostListener, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';


import { NgZone } from '@angular/core';
import { FirebaseService } from '../FirebaseService/firebase.service';
import { AuthService } from '../authentication/auth/auth.service';
import { element } from 'protractor';
@Component({
  selector: 'app-page-space-er',
  templateUrl: './page-space-er.page.html',
  styleUrls: ['./page-space-er.page.scss'],
})
export class PageSpaceErPage implements OnInit {
  isDesktop: boolean;
  //contents: displayArticle[] = displayArticles;
  articles: content[];
  userId: any;
  userData: any;
  latestRead: any;
  pagePosition: any;
  segment: any;
  readProgressHeader: string;
  readProgressImg: any;
  readProgressTitle: any;
  readProgressIntro: any;
  survey: any;
  userEcoScore=0;


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
    this.authService.afAuth.onAuthStateChanged(user => {
      if (user) {
        console.log('logged in:', user.uid);
        this.userId = user.uid;
        this.loadUserLatesReadsById();
        this.loadUserEcoScore();
      } else {
        this.userId = undefined;
        console.log('logged out, userId: ', this.userId);
      }
    });
  }


  ngOnInit() {

  }
  loadUserEcoScore(){
    const subscription = this.firebaseService.getUserByIdService(this.userId).subscribe(
      e=>{
        this.userEcoScore = e.payload.data()['totalEcoScore']; // get user total eco score
      }
    ) 
    if (this.userId == null || this.userId == undefined) {
      subscription.unsubscribe();
    } 
  }
  loadUserLatesReadsById() {
    console.log("run loadUserById() for latest read");
    const subscription = this.firebaseService.getUserDataByIdService(this.userId).subscribe(
      e => {
        if (e.payload.data()['latestRead'] != undefined) {
          this.userData = e.payload.data()['latestRead'];
          console.log(e.payload.data()['latestRead']['completed']);
          if (e.payload.data()['latestRead']['completed'] == false) {//continue to read latest read
            this.readProgressHeader = "Pick up where you left off";
            this.pagePosition = this.userData.depth;
            this.segment = this.userData.segment;
            this.latestRead = this.userData.id;
            this.firebaseService.getDataByIdService(this.latestRead).subscribe(
              res => {
                this.readProgressImg = res.payload.data()['image'];
                this.readProgressTitle = res.payload.data()['title'];
                this.readProgressIntro = res.payload.data()['cardIntroduction'];
              },
              err => {
                console.debug(err);
              }
            )

            console.log('this user latest read content loaded:', this.userData);

            console.log(this.latestRead);

          } else {//find a partially read article, if not found then find the first unread article
            
            let readArticles = e.payload.data()['readArticles'];
            let partialArticle = undefined;

            for (let i = 0; i < readArticles.length; i++) {
              if (readArticles[i].progress == "partial") {
                this.readProgressHeader = "Continue reading";
                partialArticle = readArticles[i];
                console.log(partialArticle);
                this.latestRead = partialArticle.id;
                this.firebaseService.getDataByIdService(this.latestRead).subscribe(
                  res => {
                    this.readProgressImg = res.payload.data()['image'];
                    this.readProgressTitle = res.payload.data()['title'];
                    this.readProgressIntro = res.payload.data()['cardIntroduction'];
                  },
                  err => {
                    console.debug(err);
                  }
                )
                break;
              }
            }
            if (partialArticle == undefined) {//if still undefined then find the first unread article
              for (let i = 0; i < readArticles.length; i++) {
                if (readArticles[i].progress == "unread") {
                  this.readProgressHeader = "Explore a new article";
                  partialArticle = readArticles[i];
                  console.log(partialArticle);
                  this.latestRead = partialArticle.id;
                  this.firebaseService.getDataByIdService(this.latestRead).subscribe(
                    res => {
                      this.readProgressImg = res.payload.data()['image'];
                      this.readProgressTitle = res.payload.data()['title'];
                      this.readProgressIntro = res.payload.data()['cardIntroduction'];
                    },
                    err => {
                      console.debug(err);
                    }
                  )
                  break;
                }
              }
            }
          }
        } else {//if the user has no latest read then get them to start at the beginning
          console.log('execute if latestReadUndefined')
          this.readProgressHeader = "Start reading";
          let readArticles = e.payload.data()['readArticles'];
          this.latestRead = readArticles[0].id;
          this.firebaseService.getDataByIdService(this.latestRead).subscribe(
            res => {
              this.readProgressImg = res.payload.data()['image'];
              this.readProgressTitle = res.payload.data()['title'];
              this.readProgressIntro = res.payload.data()['cardIntroduction'];
            },
            err => {
              console.debug(err);
            }
          )


        }
        if (this.userId == null || this.userId == undefined) {
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

type content = {
  docId: string,
  image: string,
  title: string,
  subtitle: string,
  cardIntroduction: string
}




