import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-eco-popover',
  templateUrl: './eco-popover.component.html',
  styleUrls: ['./eco-popover.component.scss'],
})
export class EcoPopoverComponent implements OnInit {

  constructor(public ecopopover: PopoverController) { }

  ngOnInit() {}

  ClosePopover(){
    this.ecopopover.dismiss();
  }


}
