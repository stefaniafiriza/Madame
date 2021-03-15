import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FavFood } from '../sablonFood/favFood';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['../../nav.css','./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  productList : FavFood[] = [ {name:"Mint-chocolate cake",photo:"assets\\image\\mintcake.jpg",description: "A very sweet cake",rating: 5},
  {name:"Burger",photo:"assets\\image\\burger.png",description: "A very tasty burger",rating: 5}]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sendHome(){
    this.router.navigate(['../home']);
  }
  sendRegister () {
    this.router.navigate(['/register']);
  }

  sendLogin () {
    this.router.navigate(['/login']);
  }
}
