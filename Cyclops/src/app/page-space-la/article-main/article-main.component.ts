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
  @Input() col: string;
  constructor() { }
  ngOnInit() { }

  articleRemoveEvent(aIndex: number) {
    console.log("remove", aIndex);
    this.contentCol.splice(aIndex,1);
  }
  articleAddEvent() {
    console.log("add new artciel to col", this.contentCol);
    const newArticle:fetchArticle = {
      id: '',
      title: 'new Title',
      subtitle: '',
      image: '../assets/pic1.jpg',
      cardIntroduction: 'new Introduction',
      columnName: this.col,
      segment: []
    }
    this.contentCol.push(newArticle);
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
  columnName: string;
  segment: segmentItem[];
}