import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../FirebaseService/firebase.service';
import { displayArticles } from '../sharedData/displayArticles';
import { ecoData } from '../sharedData/ecoData';
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
  constructor(private firebaseService: FirebaseService) {
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
    this.deleteAllUserData();
    let users = this.firebaseService.getAllUsersService();
    let data: any[] = [];

    let articles = this.firebaseService.getAllArticlesService();
    (await articles).forEach((articleDoc) => {
      let segmentsLength = articleDoc.data()['segment'].length;
      let segmentRead = Array(segmentsLength).fill(false);//initalize all segments read to be false
      let newData = { id: articleDoc.id, segment: segmentRead, time: 1234, progress: "unread" };
      data.push(newData);
    });
    console.log(data);

    (await users).forEach((userDoc) => {
      console.log(userDoc.data());
      this.firebaseService.addDataWithIdService('usersCollection', userDoc.id, { readArticles: data });

    });
  }

  //initialize the eco solution data from variables
  async initializeEcoS() {
    for (let ecoDataItem of ecoData) {
      this.firebaseService.addDataService("NewEcoSolution", ecoDataItem).then((res: any) => {
        console.log(res);
      }).catch((error) => {
        console.log(error);
      })
    }
    alert("successful");
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

  deleteAllUserData() {
    for (let doc of this.userIds) {
      this.firebaseService.deleteDocByIdService("usersCollection", doc.userId).then((res: any) => console.log(res, " ", doc.userId))
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

  loadUserDocId() {//const subscription =
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
