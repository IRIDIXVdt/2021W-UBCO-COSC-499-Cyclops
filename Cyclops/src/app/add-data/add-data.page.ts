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
}
