import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-editing-tool-test-page',
  templateUrl: './editing-tool-test-page.page.html',
  styleUrls: ['./editing-tool-test-page.page.scss'],
})
export class EditingToolTestPagePage implements OnInit {
  public Editor = ClassicEditor;
  //Import the editor build in your Angular component and assign it to a public property to make it accessible from the template:

  constructor() { }

  ngOnInit() {
  }

}
