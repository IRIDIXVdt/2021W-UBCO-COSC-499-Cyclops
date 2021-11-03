import { Component } from '@angular/core';
// import SwiperCore, { Navigation, Pagination } from 'swiper';
// import { IonicSwiper } from '@ionic/angular';

// SwiperCore.use([IonicSwiper, Navigation, Pagination]);
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public popover:PopoverController) {}

  async notifications(ev: any) {  
    const popover = await this.popover.create({  
        component: PopoverComponent,  
        event: ev,  
        animated: true,  
        showBackdrop: true  
    });  
    return await popover.present(); 
  }

}
