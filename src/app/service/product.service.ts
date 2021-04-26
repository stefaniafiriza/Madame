import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  public numberItems: number = 0;
  public totalPrice: number = 0;
}
