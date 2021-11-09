import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-page-space-me',
  templateUrl: './page-space-me.page.html',
  styleUrls: ['./page-space-me.page.scss'],
})
export class PageSpaceMePage implements OnInit {
  

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

  ngOnInit() {
  }

}
