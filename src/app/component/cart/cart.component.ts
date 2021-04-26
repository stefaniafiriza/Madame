import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CartProduct } from 'src/app/models/cart-product';
import { User } from '../../models/user';
import { AuthService } from '../../service/auth.service';
import { Product } from '../../models/product';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: CartProduct[] = [];
  u: User;
  emailUser: string = this.cookie.get('usernameCookie');
  totalPrice: number = 0;
  currentUser: any;

  constructor(
    private auth: AuthService,
    private db: AngularFirestore,
    private router: Router,
    private cookie: CookieService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.auth.getUser(this.emailUser).subscribe(
      (users: User[]) => {
        for (this.u of users) {
          if (this.u.email === this.emailUser){
            this.currentUser = this.u;
            this.cart = this.u.products;
            this.productService.totalPrice = 0;
            this.cart.forEach(elem => this.productService.totalPrice = elem.price + this.productService.totalPrice);
          }
        }
      }
    );
  }

  @Output() close = new EventEmitter<void>();
  onClose() {
    this.close.emit();
  }

  removeProduct(product: Product){
    this.cart.forEach((elem,index) => {
      if (elem.name == product.name) {
        this.productService.numberItems -= this.cart[index].quantity;
        this.cart.splice(index,1);
      } 
    });
    this.auth.updateEmptyList();
    this.auth.updateProductList(this.cart);
  }

  key: any = -1;
  addOneProduct(product: Product) {
    this.key = this.cart.findIndex(elem => elem.name == product.name);
    var price = product.price;
    if (this.key != -1) {
      if (this.cart[this.key].quantity > 1) {
        price = product.price/this.cart[this.key].quantity;
      }
      this.cart[this.key].quantity = this.cart[this.key].quantity + 1;
      this.productService.numberItems += 1;
      this.cart[this.key].price = this.cart[this.key].price + price;
      this.auth.updateEmptyList();
      this.auth.updateProductList(this.cart);
    }
  }

  removeOneProduct(product: Product) {
    this.key = this.cart.findIndex(elem => elem.name == product.name);
    var price = product.price;
    if (this.key != -1) {
      if (this.cart[this.key].quantity > 1) {
        price = product.price/this.cart[this.key].quantity;
      }
      this.cart[this.key].quantity = this.cart[this.key].quantity - 1;
      this.productService.numberItems -= 1;
      this.cart[this.key].price = this.cart[this.key].price - price;
      this.auth.updateEmptyList();
      this.auth.updateProductList(this.cart);
    }
  }

  payCard: string;
  payCash: string;

  sendOrder() {
    var payCard = document.getElementById("payCart") as HTMLInputElement;  
    var payCash = document.getElementById("payCash") as HTMLInputElement;

    if (payCash.checked  == true) {
      this.payCash = "Pay cash";
      this.productService.numberItems = 0;
      this.insertOrderData(this.payCash);
      this.router.navigate(['home']);
      alert('Your order will be delivered in the shortest time!');
    } else {
      if (payCard.checked == true) {
        this.payCard = "Pay with card";
        this.productService.numberItems = 0;
        this.insertOrderData(this.payCard);
        this.router.navigate(['card-pay']);
      }
    }
    
  }

  insertOrderData(payment) {
    this.auth.updateEmptyList();
    const id = this.db.createId();
    this.db.doc(`orders/${id}`).set({
      name: this.auth.currentUserName(),
      address: this.currentUser.address,
      email: this.currentUser.email,
      phone: this.currentUser.phone,
      products: this.currentUser.products,
      totalPrice: this.productService.totalPrice,
      payment: payment
    });
  }

}
