import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-section1',
  templateUrl: './slide-section1.component.html',
  styleUrls: ['./slide-section1.component.scss'],
})
export class SlideSection1Component implements OnInit {

  constructor() { }

  ngOnInit() {}
  
  slideOpt ={
    direction: 'vertical',
    slidesPerView: 2,
    pagination: {
      el: '.swiper-pagination',
    }
  }
}
