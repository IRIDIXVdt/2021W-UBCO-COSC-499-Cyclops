import { Component, HostListener, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
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
  contents: displayArticle[] = displayArticles;
  constructor(private screensizeService: ScreensizeService, private platform: Platform) {
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
}
