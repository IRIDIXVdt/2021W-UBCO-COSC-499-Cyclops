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

getDataServiceMainPage(){
  return this.db.collection("articles", ref => 
  ref.orderBy('id','asc')).snapshotChanges();
}

getDataByIdService(docId){
  return this.db.collection('articles').doc(docId).snapshotChanges();
}

updateDataByIdService(docId,data){
  return this.db.collection('articles').doc(docId).set(data);
}

}


