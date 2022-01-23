import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.page.html',
  styleUrls: ['./add-data.page.scss'],
})
export class AddDataPage implements OnInit {
  data={
    id : '2',
    name : "larry"

  }
  constructor(private firebaseService:FirebaseService) { 
    // this.addData(this.data)
  }
  // await setDoc(doc(db, "cities", "LA"), {
  //   name: "Los Angeles",
  //   state: "CA",
  //   country: "USA"
  // });
  ngOnInit() {
  }
  


  addData(data){
    this.firebaseService.addDataService(data).then((res:any) => {
      console.log(res);
    })
  }
}
