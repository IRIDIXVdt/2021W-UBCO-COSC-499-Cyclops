import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { segmentItem } from 'src/app/sharedData/displayArticle';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent implements OnInit {
  @Input() content: fetchArticle;
  editC: fetchArticle;

  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
  ) {
    this.editC = this.navParams.data.content;
    console.log(this.editC);
    
  }

  ngOnInit() {
    console.log(this.content);
    // this.editTitle.title = this.content.title
  }
  dismissModal() {
    console.log("we have the editC now as:", this.editC);
    this.modalController.dismiss();
  }
  onTitleEditorChange() {
    // console.log(this.editTitle);
  }
  save(t: string, s: string, c: string) {
    this.editC.subtitle = t;
    this.editC.title = s;
    this.editC.cardIntroduction = c;

    this.content.subtitle = t;
    this.content.title = s;
    this.content.cardIntroduction = c;
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
