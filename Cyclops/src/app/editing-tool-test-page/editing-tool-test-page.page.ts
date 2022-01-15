import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { displayArticle } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editing-tool-test-page',
  templateUrl: './editing-tool-test-page.page.html',
  styleUrls: ['./editing-tool-test-page.page.scss'],
})
export class EditingToolTestPagePage implements OnInit {
  //get access to all the articles
  contents: displayArticle[] = displayArticles;
  //sepcify the segment section
  currentSeg: number;
  //get access to a specific article (with the provided id passes from page space la)
  articleId;
  public model;

  constructor(
    private activatedrouter: ActivatedRoute
  ) {
    this.currentSeg = 0;
    //fetch article id from the other side and store it in articleId
    this.articleId = this.activatedrouter.snapshot.paramMap.get('id'); 
    this.model = {//model specifies the information the page would get
    editorData: this.contents[this.articleId].segment[this.currentSeg].segmentBody
  };
  }

  //Import the editor build in your Angular component and assign it to a public property to make it accessible from the template
  public Editor = ClassicEditor;


  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();
    console.log( data );
  }

  ngOnInit() {
  }

}   
