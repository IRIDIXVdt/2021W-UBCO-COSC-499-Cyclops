import { Injectable,NgZone } from '@angular/core';

import { User } from "../sharedData/user";
/*  import { firebase } from '@firebase/app'; */ 
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data
  authentication:boolean;
  adminAuth:boolean;
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public alertController: AlertController
  ) {  
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log("has user logged in ");
      } else {
        this.userData = null;
      }
    })
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    /* this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
         console.log("user",this.userData);
        localStorage.setItem('user', JSON.stringify(this.userData));
        console.log("user2",JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));

        this.authentication = true;
        localStorage.setItem('authentication', JSON.stringify(this.authentication)); 
        
      } else {
         localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));

        this.authentication = false;
        localStorage.setItem('authentication', JSON.stringify(this.authentication)); 
        this.userData = null;
      }
    }) */
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if(result.user.emailVerified) {
          this.userData = result.user;
          this.router.navigate(['tabs/page-space-er']);          
        } else {
          this.signInErrorAlert("Email is not verified");
          return false;
        }
      }).catch((error) => {
        this.userData = null;
        console.log("Login error: ",error);
        this.signInErrorAlert("Invalid username/password");
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
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        /* this.SetUserData(result.user); */
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    return (await (this.afAuth.currentUser)).sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
   /*  return this.AuthLogin(new auth.GoogleAuthProvider()); */
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['tabs/page-space-er']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
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
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      /* localStorage.removeItem('user'); */
      this.userData = null;
      this.router.navigate(['tabs/page-space-er']); 
    })
  }

   refresh() {
    this.ngZone.run(() => {
      console.log('force update the screen');
    });
  }

  newSignOut() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
    })
  }


}
