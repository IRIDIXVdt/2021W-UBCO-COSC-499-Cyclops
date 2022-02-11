import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collectionName: 'displayArticles';
  //.collection("displayArticles")
  constructor(private db: AngularFirestore) {
    //db is the AngularFireStore component

  }


  getDataService() {
    return this.db.collection("test").snapshotChanges();

  }

  addDataService(collection, data) {
    return this.db.collection(collection).add(data);
  }

  removeDataService(id) {
    return this.db.doc("test" + "/" + id).delete();
  }

  getDataServiceMainPage() {
    return this.db.collection("articles", ref =>
      ref.orderBy('id', 'asc')).snapshotChanges();
  }

  getDataByIdService(docId) {
    return this.db.collection('articles').doc(docId).snapshotChanges();
  }

  //return all users
  async getUsersService() {
    const users = await getDocs(this.db.collection("users").ref);
    return users;
  }

  updateDataByIdService(docId, data) {
    // return this.db.collection('articles').doc(docId).set(data);

    return this.db.collection('articles').doc(docId).update(data);
  }

  updateUserDataByIdService(userId, data) { //currently used to update user information with list of existing articles
    return this.db.collection('users').doc(userId).update(data);
  }


  deleteDocByIdService(collection, docId) {
    return this.db.collection(collection).doc(docId).delete();
  }


  getUserDataService() {
    return this.db.collection("users").snapshotChanges();
  }

  /* searchAdminEmail(email){
    return this.db.collection("adminUsers").where
  } */

}


