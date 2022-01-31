import { Component, HostListener, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { ScreensizeService } from './services/screensize.service';
import { AuthService } from '../auth/auth.service';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-page-space-er',
  templateUrl: './page-space-er.page.html',
  styleUrls: ['./page-space-er.page.scss'],
})
export class PageSpaceErPage implements OnInit {
  isDesktop: boolean;
  //contents: displayArticle[] = displayArticles;
  articles: any;

  authentication: boolean; // validate user is logged in or not 

  fButtons = [ // false: have not logged in authentication = false.   true: already Logged in 
    { iconName: "log-in-outline", routerLink: "/login", clickMethod: "", isActive: false },
    { iconName: "remove-circle-outline", routerLink: "", clickMethod: "authService.SignOut()", isActive: true },
    { iconName: "person-circle-outline", routerLink: "", clickMethod: "", isActive: true }
  ];

  constructor(
    public firebaseService: FirebaseService,
    private screensizeService: ScreensizeService,
    private platform: Platform,
    public authService: AuthService,
    private zone: NgZone) {
    console.log("constructor run");
    this.loadData();

    this.initializeApp();

    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) {

      }

      this.isDesktop = isDesktop;
    });

    /*  this.isLoggedIn(); // return T/F to authentication */
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.screensizeService.onResize(this.platform.width());
    });
  }
  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.screensizeService.onResize(event.target.innerWidth);
  }

  ngOnInit() {

  }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  async loadData() {
    this.firebaseService.getDataServiceMainPage().subscribe((res) => {
      this.articles = res.map(e => {
        return {
          docId: e.payload.doc.id,
          image: e.payload.doc.data()['image'],
          title: e.payload.doc.data()['title'],
          subtitle: e.payload.doc.data()['subtitle']
        }
      })
      console.log(this.articles);
    }, (err: any) => {
      console.log(err);
    })
  }

  async isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      this.authentication = true;
      console.log("authentication", this.authentication);
    } else {
      this.authentication = false;
      console.log("authentication", this.authentication);

    }
  }

  // async isLoggedIn() {
  //   const auth = JSON.parse(localStorage.getItem('authentication'));
  //   if (auth) {
  //     this.authentication = true;
  //     console.log("authentication", this.authentication);
  //   } else {
  //     this.authentication = false;
  //     console.log("authentication", this.authentication);

  //   }
  // }



  /* getActive() {
    if(this.authentication){
      return this.fButtons.filter((i:any) => {
        return i.isActive === true
      })
    }else{
      return this.fButtons.filter((i:any) => {
        return i.isActive === false;
      })
    }
    
  } */

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
    });
  }


}
