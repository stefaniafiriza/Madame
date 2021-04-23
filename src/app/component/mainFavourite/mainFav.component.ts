import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { database, firestore } from 'firebase';
import { AuthService } from 'src/app/service/auth.service';
import { FavFood } from '../sablonFood/favFood';
import { elementAt } from 'rxjs/operators';
@Component({
  selector: 'app-favourites',
  templateUrl: './mainFav.component.html',
  styleUrls: ['../../nav.css', './mainFav.component.css'],
})
export class MainFavComponent implements OnInit {
  productList: FavFood[] = [];
  
  cache: Map<string, FavFood[]> = new Map();


  databaseRef: database.Reference;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.populate('drink')
  }

  populate(nume: string): void {

    this.productList = []
  
    if(this.cache.has(nume))
    {
      this.productList = this.cache.get(nume);
      return;
    }

    firestore()
      .collection('products')
      .doc(nume)
      .get()
      .then((snapshot) => {
        this.snapshotToStaffArray(nume, snapshot.data());
      });
  }



  
  snapshotToStaffArray(nume:string, snapshot: firestore.DocumentData) {
    Object.keys(snapshot).forEach((key) => {
      let value = snapshot[key];
      this.productList.push({
        name: value.name,
        photo: value.photo,
        description: value.description,
        rating: value.rating,
        currentCat: nume,
        id: key,
      });
    });

    this.cache.set(nume,this.productList);
  }

  sendHome() {
    this.router.navigate(['../home']);
  }
  sendRegister() {
    this.router.navigate(['/register']);
  }

  sendLogin() {
    this.router.navigate(['/login']);
  }
  sendTeam() {
    this.router.navigate(['./team']);
  }
  sendReview() {
    this.router.navigate(['./review']);
  }
  sendContact(){
    this.router.navigate(['./contact']);
  }
  sendMenu(){
    this.router.navigate(['../dailymenu']);
  }
  sendCareer(){
    this.router.navigate(['../join']);
  }
  hideBarLink: boolean = false;
  logged: boolean =
    this.auth.isLogged == false
      ? (this.hideBarLink = false)
      : (this.hideBarLink = true);

  logout() {
    this.auth.logout();
  }
}
