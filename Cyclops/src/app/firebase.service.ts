import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collectionName: 'displayArticles';
  //.collection("displayArticles")
  constructor(private db: AngularFirestore) {
    //db is the AngularFireStore component
    
  }


getDataService(){
  return this.db.collection("test").snapshotChanges();

}

addDataService(data){
  return this.db.collection('articles').add(data);
}

removeDataService(id){
  return this.db.doc("test" + "/" + id).delete();
}



}


