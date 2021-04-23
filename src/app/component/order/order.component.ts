import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { firestore } from 'firebase';
import { Product } from '../../models/product';
import { getProducts } from '../order/getProductList';
import { CartProduct } from 'src/app/models/cart-product';
import { User } from '../../models/user';
import { CookieService } from 'ngx-cookie-service';

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
  cart: CartProduct[] = [];
  u: User;
  emailUser: string = this.cookie.get('usernameCookie');

  constructor(
    private auth: AuthService,
    private router: Router,
    private cookie: CookieService
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

    this.auth.getUser(this.emailUser).subscribe(
      (users: User[]) => {
        for (this.u of users) {
          if (this.u.email === this.emailUser){
            this.cart = this.u.products;
          }
        }
      }
    );
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
  sendFav() {
    this.router.navigate(['/mainFav']);
  }

  logout() {
    this.auth.logout();
  }
  sendCareer(){
    this.router.navigate(['../join']);
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

  productList: CartProduct[] = [];
  key: any = -1;
  numberItems: number = 0;
 
  addProductCart(product: Product) {
      
    this.key = this.cart.findIndex(elem => elem.name == product.name);
    if (this.key != -1) {
      this.cart[this.key].quantity = this.cart[this.key].quantity + 1;
      this.numberItems += 1;
      this.cart[this.key].price = this.cart[this.key].quantity * this.cart[this.key].price;
      this.auth.updateEmptyList();
      this.auth.updateProductList(this.cart);
    } else {
      this.productList.push({
        name: product.name,
        price: product.price,
        quantity: 1
      });
      this.numberItems += 1;
      this.auth.updateProductList(this.productList);
    }
  
  }

  sendDailyMenu() {
    this.router.navigate(['/dailymenu']);
  }

}
