import { Component } from '@angular/core';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { IonicSwiper } from '@ionic/angular';

SwiperCore.use([IonicSwiper, Navigation, Pagination]);

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

}
