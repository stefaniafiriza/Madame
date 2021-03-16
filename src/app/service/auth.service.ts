import { Injectable, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { delay, map } from 'rxjs/operators';
import * as firebase from 'firebase';

import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: AngularFirestoreCollection<User>;
  u: User;
  isLogged: boolean = false;

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) { 
    this.users = db.collection<User>('/Users');
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
        if(userCredential) {
          if(userCredential.user.emailVerified !== false) {
            this.isLogged = true;
            this.router.navigate(['/home']);
          } else {
            window.alert('Please validate your email address. Kindly check your inbox.');
            this.router.navigate(['']);
          }
        }
      });
  }

  logout() {
    console.log("out");
    return this.angularFireAuth.signOut()
    .then( () => {
      console.log("out");
      this.router.navigate(['']);
      this.isLogged = false;
    });
  }

}
