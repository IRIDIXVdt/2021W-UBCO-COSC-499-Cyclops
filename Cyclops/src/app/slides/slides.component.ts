import { Component } from '@angular/core';
import { slideOptsCoverFlow, slideOptsCube, slideOptsFade, slideOptsFilp } from './slides.component.anime';
// import SwiperCore, { Navigation, Pagination, Virtual, EffectFade  } from 'swiper';
// import { IonicSwiper } from '@ionic/angular';

// SwiperCore.use([IonicSwiper, Navigation, Pagination, Virtual, EffectFade]);
// SwiperCore.use([Virtual]);

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  slideOpts1 = slideOptsCoverFlow;
  slideOpts2 = slideOptsCube;
  slideOpts3 = slideOptsFade;
  slideOpts4 = slideOptsFilp;
  // slides = Array.from({ length: 1000 }).map(
  //   (el, index) => `Slide ${index + 1}`
  // );
  // slideOptsPage:'slides.compoenent.anime.ts';
  // slideOpts1 = slideOptsCoverFlow;
  constructor() { }

}
