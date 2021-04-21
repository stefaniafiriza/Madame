import { Injectable, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { delay, map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { CookieService } from 'ngx-cookie-service';
import { CartProduct } from '../models/cart-product';

import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users : Observable<any[]>;
  u: User;
  isLogged: boolean = false;
  password: string;
  photo: string;

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private ngZone: NgZone,
    private cookie: CookieService
  ) {
    this.users = this.db.collection('Users').snapshotChanges().pipe(map (
      actions => {
        return actions.map(
          a => {
            const data = a.payload.doc.data() as User;
            return data;
          }
        )
      }
    ));
  }

  getUser(email: string): Observable<User[]> {
    return this.db.collection<User>('/Users').valueChanges()
      .pipe(map(elem => elem.filter(user => user.email === email)));
  }

  sendVerificationMail() {
    return this.angularFireAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/verify-email']);
      })
  }

  registerUser(user: User) {
    this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        this.newUser.photo = this.photo;
        userCredential.user.updateProfile({
          displayName: user.Name
        });
        this.insertUserData(userCredential);
        this.sendVerificationMail()
          .then(() => {
            this.router.navigate(['/verify-email'])
          });
      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      Name: this.newUser.Name,
      phone: this.newUser.phone,
      address: this.newUser.address,
      products: this.newUser.products,
      photo: this.newUser.photo
    });
  }

  login(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if (userCredential) {
          if (userCredential.user.emailVerified !== false) {
            this.isLogged = true;
            this.password = password;
            this.cookie.set('usernameCookie', email);
            this.cookie.set('passwordCookie', password);
            this.cookie.set('nameUserCookie', userCredential.user.displayName);
            this.router.navigate(['/home']);
          } else {
            window.alert('Please validate your email address. Kindly check your inbox.');
            this.router.navigate(['']);
          }
        }
      });
  }

  logout() {
    return this.angularFireAuth.signOut()
      .then(() => {
        this.router.navigate(['']);
        this.isLogged = false;
        this.cookie.deleteAll();
      });
  }

  forgotPassword(passwordResetEmail) {
    return this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        this.eventAuthError.next(error);
      })
  }

  GoogleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  authLogin(provider) {
    return this.angularFireAuth.signInWithPopup(provider)
      .then((userCredential) => {
        this.updateUserData(userCredential.user);
        this.cookie.set('usernameCookie', userCredential.user.email);
        this.cookie.set('nameUserCookie', userCredential.user.displayName);
        this.ngZone.run(() => {
          this.isLogged = true;
          this.router.navigate(['/home']);
        })
      }).catch((error) => {
        this.eventAuthError.next(error);
      })
  }

  private updateUserData(user) {
    const data = { 
      email: user.email, 
      displayName: user.displayName, 
      photo: user.photoURL,
      phone: 0,
      address: 'str. Zambilelor',
      products: [],
    } 

    return this.db.doc(`Users/${user.uid}`).set(data,{ merge: true });
  }

  currentUserName = () => {
    var user = firebase.auth().currentUser;
    var name;

    if (user != null) {
      name = user.displayName;
    }

    return name;

  }

  currentUserEmail = () => {
    var user = firebase.auth().currentUser;
    var email;

    if (user != null) {
      email = user.email;
    }

    return email;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve,ms));
  }

  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  changeEmail = (currentPassword, newEmail) => {
    this.reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then(() => {
        window.alert('Email updated!');
        this. sendVerificationMail()
      }).catch((error) => { 
        alert(error);
      });
    }).catch((error) => { 
      alert(error) });
  }

  resetPassword = (newPassword) => {
    var user = firebase.auth().currentUser;
    user.updatePassword(newPassword).then( () => {
      alert('New password has been saved');
    }).catch((error) => {
      alert(error);
    })
  }

  async updateProfile(photo: string) {
    var user = firebase.auth().currentUser;
    this.db.doc(`Users/${user.uid}`).update({
      photo: photo
    });
  }

  async updateProductList(productList: CartProduct[]) {
    var user = firebase.auth().currentUser;
    this.db.doc(`Users/${user.uid}`).update({
      products: productList
    });
  }

  async updateEmptyList() {
    var user = firebase.auth().currentUser;
    this.db.doc(`Users/${user.uid}`).update({
      products: []
    });
  }
}
