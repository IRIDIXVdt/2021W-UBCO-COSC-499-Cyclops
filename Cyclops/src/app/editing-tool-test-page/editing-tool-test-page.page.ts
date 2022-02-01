import { Component, OnInit, ViewChild } from '@angular/core';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { displayArticle, segmentItem } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';
import { ActivatedRoute } from '@angular/router';
// import { Content } from '@angular/compiler/src/render3/r3_ast';
import { FirebaseService } from '../firebase.service';
import { AlertController, NavController } from '@ionic/angular';

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
  //needSaving describes if the current version is the latest version
  needSaving: boolean = false;

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
  navControl: NavController;

  //Import the editor build in your Angular component and assign it to a public property to make it accessible from the template
  // public Editor = ClassicEditor;
  public Editor = InlineEditor;

  constructor(
    private activatedrouter: ActivatedRoute,
    public firebaseService: FirebaseService,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {
    this.navControl = navCtrl;
    //we start reading the first element
    this.currentSeg = 0;
    //fetch article id from the other side and store it in articleId
    this.articleId = this.activatedrouter.snapshot.paramMap.get('docId');
  }

  ngOnInit() {
    this.loadEditorDataById();//update data by id
    this.presentAlert();
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
        this.needSaving = false;
        console.log("need saving to false from loadEditorDataById");
        // this.editorComponent.focus;
      },
      err => {
        console.debug(err);
        this.presentErr("err");
      }
    )

  }

  async presentErr(errMessage: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Err',
      subHeader: 'Message:',
      message: 'errMessage',
      // buttons: ['OK']
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: '',
      // subHeader: 'Subtitle',
      message: 'This is Article Edit Page. You can edit, add and remove article here.',
      // buttons: ['OK']
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    if (role == "cancel") {
      console.log("yes it is cancel")
    }
    console.log('onDidDismiss resolved with role', role);

  }


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
    //change saving state to open
    this.needSaving = true;
    console.log("need Saving on Content Editor Change");
  }

  private onTitleEditorChange() {
    console.log("current title is: " + this.TitleInput);
    this.contents.segment[this.currentSeg].segmentTitle = this.TitleInput;
    //change saving state to open
    this.needSaving = true;
    console.log("need Saving on Title Editor Change");
  }

  private updateArticle() {
    this.editorComponent.editorInstance.setData(this.contents.segment[this.currentSeg].segmentBody)
  }

  public async backArticle() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want to go back to main page? All unsaved changes will be lost.',
      buttons: ['Cancel', 'OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role == "cancel") {
      console.log("cancel!");
    } else {
      this.navControl.back();
      console.log("back success");
    }
  }

  public async removeArticle() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want to remove ' + this.contents.segment[this.currentSeg].segmentTitle + "?",
      buttons: ['Cancel', 'OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role == "cancel") {
      console.log("cancel!");
    } else {
      console.log("remove segment article id: " + this.currentSeg);
      this.contents.segment.splice(this.currentSeg, 1);
      this.currentSeg = 0;
      if (this.contents.segment.length == 0) {
        //empty segment here, increase one
        //this initialized a new Chip
        this.onChipAdd();
        //this updates the CKEditor Directly, this is not good practice
        // this.editorComponent.editorInstance.setData("Body Paragraph");
      }
      this.updateArticle();
      // this.updateDataById(this.articleId, this.contents);
      // this.loadEditorDataById();
      console.log("Delete Success");
      // this.displayMessage("Delete Success");
    }
  }

  private reloadPage() {
    this.contents = null;
    this.loadEditorDataById();
  }

  private async saveChangesToCloud() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want to save all changes to Cloud?',
      buttons: ['Cancel', 'OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role == "cancel") {
      console.log("cancel!");
    } else {
      // this.saveChangesLocal();
      //we need to show animation to let user know there are changes
      this.updateDataById(this.articleId, this.contents);
      this.reloadPage();
      console.log("Changes saved to cloud!");
      this.displayMessage("Upload Success");
      //change saving state to close
      this.needSaving = false;
      console.log("need saving to false");
    }
  }

  async displayMessage(inputMessage: string) {
    const alert2 = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: inputMessage,
      buttons: ['OK']
    });
    await alert2.present();
  }

}
type EditPageArticle = {
  title: string;
  segment: segmentItem[];
}
