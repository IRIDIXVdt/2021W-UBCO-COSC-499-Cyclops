import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { displayArticles } from '../sharedData/displayArticles';

import { collection, getFirestore, doc, setDoc, getDocs } from "firebase/firestore";
import { AuthService } from '../authentication/auth/auth.service';
/* import { initializeApp } from 'firebase-admin/app'; */
const db = getFirestore();
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.page.html',
  styleUrls: ['./add-data.page.scss'],
})
export class AddDataPage implements OnInit {

  articles: any = displayArticles;
  contents: any;
  docIds = [];
  userIds = [];
  users = [
    {
      userName: "admin",
      userPassword: "123",
      email: "123@gmail.com"
    }
  ]
  profile = {
    emailVerified: true,
    isAnonymous: true,
    displayName: "Admin"
  }
  constructor(private firebaseService: FirebaseService, public authService: AuthService,) {
    this.loadDocId();
    this.loadUserDocId();
  }
  // await setDoc(doc(db, "cities", "LA"), {
  //   name: "Los Angeles",
  //   state: "CA",
  //   country: "USA"
  // });
  ngOnInit() {
  }

  async setAdmin(profile) {
    /*  const admin = initializeApp();
     admin.name */
  }

  addData() {
    this.deleteAllData();

    //add doc in collection
    for (let article of this.articles) {
      this.firebaseService.addDataService("articles", article).then((res: any) => {
        console.log(res);
      })
    }
    alert("successful");
  }

  //initialize article tracking information for all users
  async initializeUserReadArticles() {
    let users = this.firebaseService.getAllUsersService();
    let data: any[] = [];

    let articles = this.firebaseService.getAllArticlesService();
    (await articles).forEach((articleDoc) => {
      //let segmentsLength= articleDoc.data()['segment'].length;
      let newData = { id: articleDoc.id, totalSegments: false };//initalize all article read to be false
      data.push(newData);
    });
    console.log(data);

    (await users).forEach((userDoc) => {
      if (userDoc.id == 'P4nhCbiKyeeGpCAw3wOaIQkG3Za2') {
        console.log(userDoc.data());
        this.firebaseService.updateUserDataByIdService(userDoc.id, { readArticles: data })
      }
    });
  }

  deleteAllData() {
    //delete all doc in collection
    for (let doc of this.docIds) {
      this.firebaseService.deleteDocByIdService("articles", doc.docId).then((res: any) => console.log(res, " ", doc.docId))
    }
  }

  deleteUser() {
    //delete all doc in collection
    for (let doc of this.userIds) {
      this.firebaseService.deleteDocByIdService("users", doc.userId).then((res: any) => console.log(res, " ", doc.userId))
    }
  }

  // get all docid from collection
  loadDocId() {
    this.firebaseService.getDataServiceMainPage().subscribe((res) => {
      this.docIds = res.map(e => {
        return {
          docId: e.payload.doc.id,
        }
      })
    }, (err: any) => {
      console.log(err);
    })
  }

  loadUserDocId() {
    this.firebaseService.getUserDataService().subscribe((res) => {
      this.userIds = res.map(e => {
        return {
          userId: e.payload.doc.id,
        }
      })
    }, (err: any) => {
      console.log(err);
    })
  }


  userInitialization() {
    for (let user of this.users) {
      this.firebaseService.addDataService("users", user).then((res: any) => {
        console.log(res);
      })
    }
  }

  loadData() {
    this.firebaseService.getDataByIdService('mzV9kW2MvD4qINJD8J4p').subscribe(
      res => {
        this.contents = {

          id: res.payload.data()['id'],
          image: res.payload.data()['image'],
          title: res.payload.data()['title'],
          subtitle: res.payload.data()['subtitle'],
          segment: res.payload.data()['segment'],

        };

        console.log(this.contents.segment.length);
      },
      err => {
        console.debug(err);
      }
    )
  }
}
