import { Injectable } from '@angular/core';
import{AngularFirestore} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collectionName: 'displayArticles';
  //.collection("displayArticles")
  constructor(private firestore: AngularFirestore) {
    
   }

   getDataService(){
    return this.firestore.collection("displayArticles").snapshotChanges();
    
  }
}


