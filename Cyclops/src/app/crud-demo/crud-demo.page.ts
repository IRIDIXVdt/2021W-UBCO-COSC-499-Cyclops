import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ServiceService } from '../service.service';
import { displayArticle } from '../sharedData/displayArticle';
import { displayArticles } from '../sharedData/displayArticles';

@Component({
  selector: 'app-crud-demo',
  templateUrl: './crud-demo.page.html',
  styleUrls: ['./crud-demo.page.scss'],
})
export class CRUDDemoPage implements OnInit {
  name: any;
  users: any;
  displayArticle: any;
  constructor(
    public service: ServiceService,
    public firebaseService: FirebaseService
  ) {
    this.firebaseService.getDataService().subscribe((res) => {
      this.displayArticle = res.map(e => {
        return {
          // articleId: e.payload.doc.id,
          articleId: e.payload.doc.data()['id'],
          //in case this is reading document id, we read by doc.data instead
          articleTitle: e.payload.doc.data()['title'],
          articleSegment: e.payload.doc.data()['segment1']
          //read document from firebase
        }
      })
      console.log(this.displayArticle);
    }, (err: any) => {
      console.log(err);
    })



  }
  addName() {
    console.log(this.name);
    let data = {
      name: this.name
    }

    this.service.addNameService(data).subscribe((res: any) => {
      console.log("SUCCESS ===", res);
      this.name = '';
      alert("SUCCESS");
      this.getName();
    }, (error: any) => {
      console.log("ERROR ===", error);
    })
  }

  getName() {
    this.service.getNameService().subscribe((res: any) => {
      console.log("getName SUCCESS ===", res);
      this.users = res;
    }, (error: any) => {
      console.log("getName ERROR ===", error);
    })
  }

  ngOnInit() {
  }



}
