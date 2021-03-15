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

  registerUser(user: User) {
    this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        userCredential.user.updateProfile({
          displayName: user.Name
        });
        this.insertUserData(userCredential);
        this.router.navigate(['']);
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
          this.isLogged = true;
          this.router.navigate(['/home']);
         
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
