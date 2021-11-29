import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-article-modal-main',
  templateUrl: './article-modal-main.component.html',
  styleUrls: ['./article-modal-main.component.scss'],
})
export class ArticleModalMainComponent implements OnInit {

  contentModal: any = {};
  constructor(
    public modalController: ModalController,
    private navParams: NavParams
  ) {
    this.contentModal = this.navParams.data;
  }
  ngOnInit() { }

  onclose() {
    console.log("modal controler dismiss");
    this.modalController.dismiss();
  }

  submit() {
    this.modalController.dismiss(this.contentModal)
  }
}
