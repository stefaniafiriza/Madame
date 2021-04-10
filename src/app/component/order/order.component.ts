import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { firestore } from 'firebase';
import { Product } from '../../models/product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['../../nav.css','./order.component.css']
})
export class OrderComponent implements OnInit {

  pizzas : Product[] = [];
  pastas: Product[] = [];
  soups: Product[] = [];
  meats: Product[] = [];

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    firestore().collection('products').doc('pizza').get().then( (snapshot) => {
      this.getPizzaProducts(snapshot.data());
    });

    firestore().collection('products').doc('pasta').get().then( (snapshot) => {
      this.getPastaProducts(snapshot.data());
    });

    firestore().collection('products').doc('soup').get().then( (snapshot) => {
      this.getSoupProducts(snapshot.data());
    });

    firestore().collection('products').doc('meat').get().then( (snapshot) => {
      this.getMeatProducts(snapshot.data());
    });
  }

  getPizzaProducts(snapshot: firestore.DocumentData){

    Object.keys(snapshot).forEach((key)=>{
      let value = snapshot[key];
      this.pizzas.push(
        {
          name: value.name,
          price: value.price,
          photo: value.photo,
          description: value.description,
          rating: value.rating
        }
      )
    });
  }

  getPastaProducts(snapshot: firestore.DocumentData){

    Object.keys(snapshot).forEach((key)=>{
      let value = snapshot[key];
      this.pastas.push(
        {
          name: value.name,
          price: value.price,
          photo: value.photo,
          description: value.description,
          rating: value.rating
        }
      )
    });
  }

  getSoupProducts(snapshot: firestore.DocumentData){

    Object.keys(snapshot).forEach((key)=>{
      let value = snapshot[key];
      this.soups.push(
        {
          name: value.name,
          price: value.price,
          photo: value.photo,
          description: value.description,
          rating: value.rating
        }
      )
    });
  }

  getMeatProducts(snapshot: firestore.DocumentData){

    Object.keys(snapshot).forEach((key)=>{
      let value = snapshot[key];
      this.meats.push(
        {
          name: value.name,
          price: value.price,
          photo: value.photo,
          description: value.description,
          rating: value.rating
        }
      )
    });
  }

  status : boolean = false;

  showHide (id) {

    var contor;

    for (contor=1; contor<=8; contor++)
        if(contor == id)
          document.getElementById("course" + contor).style.display="block"; 
        else
          document.getElementById("course" + contor).style.display="none"; 
  }

  sendHome() {
    this.router.navigate(['/home']);
  }

  sendProfile() {
    this.router.navigate(['/profile']);
  }

  sendContact() {
    this.router.navigate(['/contact']);
  }

  logout() {
    this.auth.logout();
  }

  sendTeam() {
    this.router.navigate(['../team']);
  }

}
