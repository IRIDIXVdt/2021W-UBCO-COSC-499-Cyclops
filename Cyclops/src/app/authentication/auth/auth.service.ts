import { Injectable, NgZone } from '@angular/core';

import { User } from "../../sharedData/user";
import firebase from 'firebase/compat/app';


import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data
  authentication: boolean;
  adminAuth: boolean;
  admin: boolean;
  Login: boolean;
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {

  }


  //return true if has logged in
  isLogin() {
    /* console.log("login check ",localStorage.getItem('user')) */
    if (!JSON.parse(localStorage.getItem('user'))) {
      return false;
    } else {
      return true;
    }
  }
  // Sign in with email/password
  async SignIn(email, password) {
    // create a loading animation
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();  // present loading animation
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified) { // if user's account has been verified
          this.userData = result.user; // stored user's info in to local variable (refresh page will reset this variable)
          localStorage.setItem('user', JSON.stringify(this.userData)); // stored user's info in to local database (refresh page will not reset) 
          this.isAdmin();  // check the user is admin or not
          this.SetUserData(result.user);  // update user's info to remote database

          loading.dismiss(); //stop the loading animation

          this.router.navigate(['tabs/page-space-er']);

        } else {
          loading.dismiss(); //stop the loading animation
          this.signInErrorAlert("Email is not verified");

        }
      }).catch((error) => {
        loading.dismiss();
        this.userData = null;
        console.log("Login error: ", error);
        if (error == 'FirebaseError: Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).') {
          this.signInErrorAlert('The email or password is invalid');
        } else {
          this.signInErrorAlert('Check your internet connection');
        }

      })



  }

  async signInErrorAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Invalid',
      subHeader: '',
      message: message,
      buttons: ['Retry']
    });
    await alert.present();
  }

  // Sign up with email/password
  async SignUp(email, password) {
    // create a loading animation
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();  // present loading animation
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        loading.dismiss(); // when get result from firebase, stop the loading animation
        this.SendVerificationMail();
      }).catch((error) => {
        loading.dismiss();
        console.log(error);
        if (error == 'FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
          this.signInErrorAlert('The email address is already in use by another account, try another one');
        }
        else {
          this.signInErrorAlert('Check your internet connection');
        }

      })
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();  // present loading animation
    return (await (this.afAuth.currentUser)).sendEmailVerification()
      .then(() => {
        loading.dismiss();
        console.log("send email")
        this.router.navigate(['verify-email']);
      })
  }

  async reSendVerificationMail() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();  // present loading animation
    (await (this.afAuth.currentUser)).sendEmailVerification()
      .then(() => {
        loading.dismiss();
        this.VerificationMailAlert('A new verify email has been send to your email address');
        console.log("re-send email");

      }).catch((error) => {
        loading.dismiss();
        this.VerificationMailAlert('The request is too frequent. Please try again later');
      })
  }

  async VerificationMailAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: '',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail) {

    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();  // present loading animation
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.SignOutRestPassword();
        loading.dismiss();
        this.resetPasswordAlert("A reset password email has been send to you");
      }).catch((error) => {
        this.SignOutRestPassword();
        loading.dismiss();
        console.log(error)
        if (error == 'FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).') {
          this.resetPasswordAlert("The email address has not been registered");
        }
        else {
          this.resetPasswordAlert("Failed to request, Check your internet Connection");
        }

      })
  }

  SignOutRestPassword() {
    return this.afAuth.signOut().then(() => {
      this.userData = null;
      this.admin = false;
      console.log('admin ', this.admin)
      localStorage.setItem('user', null);
    }).catch((error) => {
      console.log(error);
      this.resetPasswordAlert("Check your internet Connection");
    })
  }

  async resetPasswordAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: '',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }



  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.userData = result.user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          this.router.navigate(['tabs/page-space-er']);
          this.isAdmin();
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        this.signInErrorAlert('Failed login with google');
      })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  async SignOut() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you want to sign-out?',
      buttons: ['Cancel', 'Yes']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role == "cancel") {
      console.log("cancel!");
    } else { // if user confirm to logout

      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
      loading.present();  // present loading animation

      return this.afAuth.signOut().then(() => {
        /* localStorage.removeItem('user'); */
        this.userData = null;
        this.admin = false;
        console.log('admin ', this.admin)
        localStorage.setItem('user', null);

        loading.dismiss();
        this.router.navigate(['tabs/page-space-er']);
      }).catch((error) => {
        console.log(error);
        loading.dismiss();
        this.resetPasswordAlert("Check your internet Connection");
      })
    }


  }


  isAdmin() {
    if (this.isLogin()) {
      const adminAccess = this.afs.collection("adminUsers", ref => ref.where('email', '==', JSON.parse(localStorage.getItem('user')).email)).snapshotChanges();
      const subscription = adminAccess.subscribe(res => {
        if (res.length > 0) {
          console.log(" Match found.");
          this.admin = true;
          console.log(this.admin);
          subscription.unsubscribe();
          return true;
        } else {
          console.log("Does not exist.");
          this.admin = false;
          subscription.unsubscribe();
          return false;
        }

      });
    }
    else {
      this.admin = false;
      console.log("Have not logged in ");
      return false;
    }
  }

  async notAdminAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warring',
      subHeader: '',
      message: 'You are not administrator, you can not edit articles. Contact cyclops@gmail.com for more info',
      buttons: ['Ok']
    });
    await alert.present();
  }

  async noLoginAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warring',
      subHeader: '',
      message: "Please Log in",
      buttons: ['Ok']
    });
    await alert.present();
  }

  async updateUserName(displayName) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();  // present loading animation

    const profile = {
      displayName: displayName,
    };

    (await this.afAuth.currentUser).updateProfile(profile).then(() => {
      console.log('updated userName');
      this.updateUserData();
      loading.dismiss();
    }).catch((error) => {
      console.log(error);
      loading.dismiss();

      this.resetPasswordAlert("Check your internet Connection");
    });


  }

  updateUserData() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        if (user.emailVerified) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          this.userData = null;
          localStorage.setItem('user', null);
        }
      } else {
        this.userData = null;
        localStorage.setItem('user', null);
      }
    })
  }
}
