import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { displayArticle } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';


@Component({
  selector: 'app-editing-tool-test-page',
  templateUrl: './editing-tool-test-page.page.html',
  styleUrls: ['./editing-tool-test-page.page.scss'],
})
export class EditingToolTestPagePage implements OnInit {
  //get access to all the articles
  contents: displayArticle[] = displayArticles;

  public Editor = ClassicEditor;
  //Import the editor build in your Angular component and assign it to a public property to make it accessible from the template:
  
  public model = {
    editorData: this.contents[0].segment[1].segmentBody
  };

  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();

    console.log( data );
  }

  constructor() { }

  ngOnInit() {
  }

}
