import { Component, OnInit, Input } from '@angular/core';
import { displayArticle } from '../../sharedData/displayArticle';
@Component({
  selector: 'app-article-main',
  templateUrl: './article-main.component.html',
  styleUrls: ['./article-main.component.scss'],
})
export class ArticleMainComponent implements OnInit {
  @Input()
  columNumber: number;

  contents: displayArticle[] = displayArticles;
  constructor(
    private modalCtrol: ModalController,
  ) {

  }

  ngOnInit() { }

  constructor() { }

  ngOnInit() {}

}
