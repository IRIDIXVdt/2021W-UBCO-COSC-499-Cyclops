import { Component, OnInit, Input } from '@angular/core';
import { segmentItem } from '../../sharedData/displayArticle';
@Component({
  selector: 'app-article-main',
  templateUrl: './article-main.component.html',
  styleUrls: ['./article-main.component.scss'],
})
export class ArticleMainComponent implements OnInit {
  @Input() contentCol: fetchArticle[];

  constructor() { }
  ngOnInit() { }

}
type fetchArticle = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cardIntroduction: string;
  columnName: number;
  segment: segmentItem[];
}