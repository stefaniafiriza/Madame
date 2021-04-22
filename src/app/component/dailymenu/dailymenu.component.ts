import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { getProducts } from '../order/getProductList';
import { Product } from '../../models/product';
import { firestore } from 'firebase';

@Component({
  selector: 'app-dailymenu',
  templateUrl: './dailymenu.component.html',
  styleUrls: ['../../nav.css','./dailymenu.component.css']
})
export class DailymenuComponent implements OnInit {

  date: number;
  soups: Product[] = [];
  meats: Product[] = [];
  gaskets: Product[] = [];
  price: number = 15;

  constructor(
    private router: Router,
    private auth: AuthService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    if (this.cookie.get('usernameCookie').length != 0) {
      this.auth.isLogged = true;
      this.hideBarLink = true;
    }

    this.date = new Date().getDay();

    firestore().collection('products').doc('soup').get().then( (snapshot) => {
      getProducts(snapshot.data(),this.soups);
    });

    firestore().collection('products').doc('meat').get().then( (snapshot) => {
      getProducts(snapshot.data(),this.meats);
    });

    firestore().collection('products').doc('gasket').get().then( (snapshot) => {
      getProducts(snapshot.data(),this.gaskets);
    });

  }

  hideBarLink: boolean = false;
  logged: boolean = this.auth.isLogged == false ? this.hideBarLink = false : this.hideBarLink = true;

  back () {
    this.router.navigate(['']);
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

  sendOnlineOrder() {
    this.router.navigate(['/order']);
  }

  hidePopupCart: boolean = false;

  showCart() {
    this.hidePopupCart = !(this.hidePopupCart);
  }

  closeCart() {
    this.hidePopupCart = false;
  }

  showHide (id) {

    var contor;

    for (contor=1; contor<=5; contor++)
        if(contor == id)
          document.getElementById("course" + contor).style.display="block"; 
        else
          document.getElementById("course" + contor).style.display="none"; 
  }

}
