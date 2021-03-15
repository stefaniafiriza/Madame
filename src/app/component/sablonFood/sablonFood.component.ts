import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FavFood } from './favFood';

@Component({
  selector: 'fav-food',
  templateUrl: './sablonFood.component.html',
  styleUrls: ['../sablon/sablon.component.css'],
})
export class FavFoodComponent implements OnInit {

    @Input() favFood: FavFood

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }


  voteProduct()
  {
    let result = confirm("Do you want to vote this product?");
    if(result)
    {
      // OK
      alert(`You voted ${this.favFood.name}`);
    }
    else
    {
      // RETURN
    }
  }


  sendHome() {
    this.router.navigate(['../home']);
  }

}
