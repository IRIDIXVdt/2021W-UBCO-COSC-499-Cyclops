import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, setDoc, doc, getDocs, getFirestore , getDocFromServer} from "firebase/firestore";
const db = getFirestore();
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

  getUserByIdService(userId){
    return this.db.collection('users').doc(userId).snapshotChanges();
  }

  //return all users
  async getAllUsersService() {
    return await getDocs(collection(db, "users")); //access fields of returned document with .data()
  }

  //return all articles
  async getAllArticlesService() {
    return await getDocs(collection(db, "articles")); //access fields of returned document with .data()
  }

  updateDataByIdService(docId, data) {
    // return this.db.collection('articles').doc(docId).set(data);

    return this.db.collection('articles').doc(docId).update(data);
  }

  //append data to user document specified by userId
  async updateUserDataByIdService(userId, data) {
    const userDoc = doc(db, 'users', userId);
    console.log('updating user:', userDoc.id, ' with:', data);
    setDoc(userDoc, data, { merge: true });//set new user information, merge:true specifies to amend and not overwrite document
  }


  deleteDocByIdService(collection, docId) {
    return this.db.collection(collection).doc(docId).delete();
  }

  async getCurrentUserData(){
    let currentUser=JSON.parse(localStorage.getItem('user'));
    return await getDocFromServer(doc(db,"users",currentUser['uid']));
  }

  getUserDataService() {//collection of ALL users
    return this.db.collection("users").snapshotChanges();
  }

  /* searchAdminEmail(email){
    return this.db.collection("adminUsers").where
  } */


  getCollectionByNameService(name) {
    return this.db.collection(name).snapshotChanges();

  }

  getFeedbackByIDService(id) {
    return this.db.collection('feedback').doc(id).snapshotChanges();
  
  }


  getSurveyService() {//collection of ALL users
    return this.db.collection("survey").snapshotChanges();
  }


}




