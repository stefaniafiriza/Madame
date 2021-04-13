import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { firestore } from 'firebase';
import { Product } from '../../models/product';
import { getProducts } from '../order/getProductList';

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
  specialities: Product[] = [];
  gaskets: Product[] = [];
  sweets: Product[] = [];
  drinks: Product[] = [];

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    firestore().collection('products').doc('pizza').get().then( (snapshot) => {
      getProducts(snapshot.data(),this.pizzas);
    });

    firestore().collection('products').doc('pasta').get().then( (snapshot) => {
      getProducts(snapshot.data(),this.pastas);
    });

    firestore().collection('products').doc('soup').get().then( (snapshot) => {
      getProducts(snapshot.data(),this.soups);
    });

    firestore().collection('products').doc('meat').get().then( (snapshot) => {
      getProducts(snapshot.data(),this.meats);
    });

    firestore().collection('products').doc('sweet').get().then( (snapshot) => {
      getProducts(snapshot.data(),this.sweets);
    });

    firestore().collection('products').doc('drink').get().then( (snapshot) => {
      getProducts(snapshot.data(),this.drinks);
    });

    firestore().collection('products').doc('gasket').get().then( (snapshot) => {
      getProducts(snapshot.data(),this.gaskets);
    });

    firestore().collection('products').doc('specialitie').get().then( (snapshot) => {
      getProducts(snapshot.data(),this.specialities);
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

  hidePopupCart: boolean = false;

  showCart() {
    this.hidePopupCart = !(this.hidePopupCart);
  }

  closeCart() {
    this.hidePopupCart = false;
  }

}
