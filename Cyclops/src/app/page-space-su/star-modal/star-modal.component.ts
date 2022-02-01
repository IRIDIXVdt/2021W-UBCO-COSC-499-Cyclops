import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-star-modal',
  templateUrl: './star-modal.component.html',
  styleUrls: ['./star-modal.component.scss'],
})
export class StarModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();

  }

  

}
