import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { segmentItem } from 'src/app/sharedData/displayArticle';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent implements OnInit {
  @Input() content: fetchArticle;

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() { }
  dismissModal() {
    this.modalController.dismiss();
  }
}
type fetchArticle = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cardIntroduction: string;
  columnName: string;
  segment: segmentItem[];
}
