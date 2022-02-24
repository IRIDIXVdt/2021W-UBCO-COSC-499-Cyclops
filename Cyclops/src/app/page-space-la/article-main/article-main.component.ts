import { Component, OnInit, Input } from '@angular/core';
import { segmentItem } from '../../sharedData/displayArticle';
@Component({
  selector: 'app-article-main',
  templateUrl: './article-main.component.html',
  styleUrls: ['./article-main.component.scss'],
})
export class ArticleMainComponent implements OnInit {
  @Input() contentCol: fetchArticle[];
  @Input() editMode: boolean;
  constructor() { }
  ngOnInit() { }

  articleRemoveEvent(aId: string) {
    console.log("remove", aId)
  }
  articleAddEvent() {
    console.log("add new artciel to col", this.contentCol);
  }
  articleEditEvent(aId: string) {
    console.log("edit event", aId);
  }

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