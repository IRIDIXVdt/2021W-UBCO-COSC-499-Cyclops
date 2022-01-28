import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { displayArticle, segmentItem } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';
import { ActivatedRoute } from '@angular/router';
// import { Content } from '@angular/compiler/src/render3/r3_ast';
import { FirebaseService } from '../firebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editing-tool-test-page',
  templateUrl: './editing-tool-test-page.page.html',
  styleUrls: ['./editing-tool-test-page.page.scss'],
})
export class EditingToolTestPagePage implements OnInit {
  @ViewChild('editor') editorComponent: CKEditorComponent;
  // @ViewChild('titleInput') 
  // @Input("content") protected content: Content;

  // testTitleClass:string = "focusClass";//an attempt to set properties using [ngClass]

  //get access to all the articles
  contents: EditPageArticle;
  // Update how we fetch contents, now using receiveSegment()

  //sepcify the segment section
  currentSeg: number;
  //get access to a specific article (with the provided id passes from page space la)
  articleId: String;
  //specify data for CKEditor
  public model;
  //get ionic input data
  TitleInput: string;


  constructor(
    private activatedrouter: ActivatedRoute,
    public firebaseService: FirebaseService,
    public alertController: AlertController
  ) {
    //we start reading the first element
    this.currentSeg = 0;
    //fetch article id from the other side and store it in articleId
    this.articleId = this.activatedrouter.snapshot.paramMap.get('docId');
    this.loadEditorDataById();//update data by id
  }

  private updateDataById(docId, data) {
    this.firebaseService.updateDataByIdService(docId, data).then((res: any) => {
      console.log(res);
    })
    // alert("successful");
  }


  private loadEditorDataById() {
    this.firebaseService.getDataByIdService(this.articleId).subscribe(
      e => {
        this.contents = {
          title: e.payload.data()['title'],
          segment: e.payload.data()['segment'],
        };
        console.log("load editor data by id message from " + this.articleId);
        console.log(this.contents);
        if (this.contents.segment.length == 0) {
          //this is persumably a new Segment with no segment component, so we increase a new one
          console.log("***Unexpected error: article with zero segments")
          this.onChipAdd();
        }
        this.model = {//model specifies the information the page would get
          editorData: this.contents.segment[this.currentSeg].segmentBody
        };
        this.TitleInput = this.contents.segment[this.currentSeg].segmentTitle;
        // this.content.addCssClass("no-scroll");
      },
      err => {
        console.debug(err);
      }
    )

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: '',
      // subHeader: 'Subtitle',
      message: 'This is Article Edit Page. You can edit, add and remove article here.',
      // buttons: ['OK']
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    if (role == "cancel") {
      console.log("yes it is cancel")
    }
    console.log('onDidDismiss resolved with role', role);

  }

  async presentAlertConfirm() {
    // const alert = await this.alertController.create({
    //   cssClass: 'my-custom-class',
    //   header: 'Confirm!',
    //   message: 'Message <strong>text</strong>!!!',
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       cssClass: 'secondary',
    //       id: 'cancel-button',
    //       handler: (blah) => {
    //         console.log('Confirm Cancel: blah');
    //       }
    //     }, {
    //       text: 'Okay',
    //       id: 'confirm-button',
    //       handler: () => {
    //         console.log('Confirm Okay');
    //       }
    //     }
    //   ]
    // });

    // await alert.present();
  }


  //Import the editor build in your Angular component and assign it to a public property to make it accessible from the template
  public Editor = ClassicEditor;
  public onChipClick(index: number) {
    // this.saveChangesLocal();
    console.log("change segment to new page " + index);
    this.currentSeg = index;

    // this.model.editorData= this.contents[this.articleId].segment[this.currentSeg].segmentBody;
    // console.log(this.editorComponent.editorInstance);\
    //update the content in the CKEditor
    this.editorComponent.editorInstance.setData(this.contents.segment[this.currentSeg].segmentBody)
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
    this.contents.segment.push({
      segmentTitle: "New Segment",
      segmentBody: "Body Paragraph"
    });
    // this.saveChangesLocal();
    //update it to the local one
    this.currentSeg = this.contents.segment.length - 1;
    //title input space updates automatically
    //manually update editor input area here
    this.updateArticle();
  }

  public onChange({ editor }: ChangeEvent) {
    // const data = editor.getData();
    // console.log(data);
    const newSegmentBody: string = this.editorComponent.editorInstance.getData();
    //store the data
    this.contents.segment[this.currentSeg].segmentBody = newSegmentBody;
    console.log("Changes saved locally!");
  }

  private onTitleEditorChange() {
    console.log("current title is: " + this.TitleInput);
    this.contents.segment[this.currentSeg].segmentTitle = this.TitleInput;
  }

  private updateArticle() {
    this.editorComponent.editorInstance.setData(this.contents.segment[this.currentSeg].segmentBody)
  }

  public removeArticle() {
    console.log("remove segment article id: " + this.currentSeg);
    this.contents.segment.splice(this.currentSeg, 1);
    this.currentSeg = 0;
    if (this.contents.segment.length == 0) {
      //empty segment here, increase one
      //this initialized a new Chip
      this.onChipAdd();
      //this updates the CKEditor Directly, this is not good practice
      // this.editorComponent.editorInstance.setData("Body Paragraph");
      this.updateArticle();

    }
    this.updateArticle();
    // this.updateDataById(this.articleId, this.contents);
    // this.loadEditorDataById();
  }

  private reloadPage() {
    this.contents = null;
    this.loadEditorDataById();
  }

  private saveChangesToCloud() {
    this.saveChangesLocal();
    //we need to show animation to let user know there are changes
    this.updateDataById(this.articleId, this.contents);
    this.reloadPage();
    console.log("Changes saved to cloud!")
  }

  private saveChangesLocal() {
    console.log("save seg change id: " + this.currentSeg);
    //now we fetch the necessary information
    // const newSegmentTitle: string = this.TitleInput;
    // this.contents.segment[this.currentSeg].segmentTitle = newSegmentTitle;
    // ion input onchange is already handling it



  }

  ngOnInit() {
  }

}
type EditPageArticle = {
  title: string;
  segment: segmentItem[];
}
