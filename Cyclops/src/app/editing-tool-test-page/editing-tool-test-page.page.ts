import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { displayArticle, segmentItem } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';
import { ActivatedRoute } from '@angular/router';
// import { Content } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-editing-tool-test-page',
  templateUrl: './editing-tool-test-page.page.html',
  styleUrls: ['./editing-tool-test-page.page.scss'],
})
export class EditingToolTestPagePage implements OnInit {
  @ViewChild('editor') editorComponent: CKEditorComponent;
  // @Input("content") protected content: Content;

  // testTitleClass:string = "focusClass";//an attempt to set properties using [ngClass]

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
    // this.content.addCssClass("no-scroll");
  }

  //Import the editor build in your Angular component and assign it to a public property to make it accessible from the template
  public Editor = ClassicEditor;
  public onChipClick(index: number) {
    console.log("change segment to new page " + index);
    this.currentSeg = index;

    // this.model.editorData= this.contents[this.articleId].segment[this.currentSeg].segmentBody;
    // console.log(this.editorComponent.editorInstance);\
    //update the content in the CKEditor
    this.editorComponent.editorInstance.setData(this.contents[this.articleId].segment[this.currentSeg].segmentBody)
    // const el: HTMLElement = document.querySelector('ion-chip');
    // el.style.setProperty('', '#36454f');
  }

  public onChipAdd() {
    // console.log("not implemented yet");
    //include an empty one
    const templateText: segmentItem = {
      segmentTitle: "New Segment",
      segmentBody: "Body Paragraph"
    }
    //add segment to contents
    console.log("the current article id is: " + this.articleId);
    this.contents[this.articleId].segment.push({
      segmentTitle: "New Segment",
      segmentBody: "Body Paragraph"
    }
    );
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    console.log(data);
  }

  public removeArticle(){
    console.log("remove segment article id: " + this.currentSeg);
    this.contents[this.articleId].segment.splice(this.currentSeg,1);
    this.currentSeg = 0;
    if(this.contents[this.articleId].segment.length == 0){
      this.onChipAdd();
    }
  }

  ngOnInit() {
  }

}   
