import { Component, HostListener, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { displayArticle } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';
import { ScreensizeService } from './services/screensize.service';

@Component({
  selector: 'app-page-space-er',
  templateUrl: './page-space-er.page.html',
  styleUrls: ['./page-space-er.page.scss'],
})
export class PageSpaceErPage implements OnInit {
  isDesktop: boolean;
  //contents: displayArticle[] = displayArticles;
  articles:any;
  constructor(public firebaseService: FirebaseService, private screensizeService: ScreensizeService, private platform: Platform) {
     this.loadData();
     this.initializeApp();

     this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) {
        
      }
 
      this.isDesktop = isDesktop;
    });
    
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
    autoplay:true
   };

   async loadData(){
    this.firebaseService.getDataServiceMainPage().subscribe((res) => {
      this.articles = res.map(e => {
        return {         
          docId:e.payload.doc.id,
          image:e.payload.doc.data()['image'],
          title:e.payload.doc.data()['title'],
          subtitle:e.payload.doc.data()['subtitle']
        }
      })
      console.log(this.articles);
    }, (err: any) => {
      console.log(err);
    })
   }
}


