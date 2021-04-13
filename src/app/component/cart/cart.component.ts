import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() close = new EventEmitter<void>();
  onClose() {
    this.close.emit();
  }

}
