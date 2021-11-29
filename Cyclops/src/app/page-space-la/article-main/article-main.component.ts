import { Component, OnInit, Input } from '@angular/core';
import { displayArticle } from '../../sharedData/displayArticle';
@Component({
  selector: 'app-article-main',
  templateUrl: './article-main.component.html',
  styleUrls: ['./article-main.component.scss'],
})
export class ArticleMainComponent implements OnInit {
  @Input()
  articleComponent: displayArticle[];

  constructor() { }

  ngOnInit() {}

  openCardModal(){
    console.log("card modal button click message");
  }
}
