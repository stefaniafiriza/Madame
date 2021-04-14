import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CartProduct } from 'src/app/models/cart-product';
import { User } from '../../models/user';
import { AuthService } from '../../service/auth.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: CartProduct[] = [];
  u: User;
  emailUser: string = this.auth.currentUserEmail();
  totalPrice: number = 0;

  constructor(
    private auth: AuthService
  ) { 
   
  }

  ngOnInit(): void {
    this.auth.getUser(this.emailUser).subscribe(
      (users: User[]) => {
        for (this.u of users) {
          if (this.u.email === this.emailUser){
            this.cart = this.u.products;
            this.totalPrice = 0;
            this.cart.forEach(elem => this.totalPrice = elem.price + this.totalPrice);
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
      if (elem.name == product.name)
        this.cart.splice(index,1);
    });
    this.auth.updateEmptyList();
    this.auth.updateProductList(this.cart);
  }

}
