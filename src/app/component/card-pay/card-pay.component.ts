import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-pay',
  templateUrl: './card-pay.component.html',
  styleUrls: ['./card-pay.component.css']
})
export class CardPayComponent implements OnInit {

  intervalID: any;
  totalPrice: string = this.productService.totalPrice.toString() + ".00";

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    this.intervalID = setInterval(() => {
      const elementExists = !!document.getElementById('myPaypalButtons');
      if (elementExists) {
        this.deleteInterval(this.intervalID);
        render({
          id: "#myPaypalButtons",
          currency: "EUR",
          value: this.totalPrice,
          onApprove: (details) => {
            alert("Transaction Successfull! Your order will be delivered in the shortest time!");
            this.router.navigate(['home']);
          }
        });
      }
    }, 1000)
  }

  deleteInterval (id) {
    clearInterval(id);
  }

  ngOnInit(): void {
  }

}
