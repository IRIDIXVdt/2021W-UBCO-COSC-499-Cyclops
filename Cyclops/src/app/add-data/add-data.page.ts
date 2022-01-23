import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { displayArticles } from '../sharedData/displayArticles';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.page.html',
  styleUrls: ['./add-data.page.scss'],
})
export class AddDataPage implements OnInit {
  articles: any = displayArticles;
  contents:any;
  constructor(private firebaseService:FirebaseService) { 
     
  }
  // await setDoc(doc(db, "cities", "LA"), {
  //   name: "Los Angeles",
  //   state: "CA",
  //   country: "USA"
  // });
  ngOnInit() {
  }
  


  addData(){
    for (let article of this.articles){
      this.firebaseService.addDataService(article).then((res:any) => {
        console.log(res);
      })
    }
    alert("scussess");
  }

  loadData(){
    this.firebaseService.getDataByIdService('mzV9kW2MvD4qINJD8J4p').subscribe(
      res => {
        this.contents= { 
          
          id:res.payload.data()['id'],
          image:res.payload.data()['image'],
          title:res.payload.data()['title'],
          subtitle:res.payload.data()['subtitle'],
          segment:res.payload.data()['segment'],          
        
        };

        console.log(this.contents.segment.length);
      },
      err => {
        console.debug(err);
      }
    )
   }
}
