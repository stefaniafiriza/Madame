import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FavFood } from './favFood';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { database, firestore } from 'firebase';
import { AuthService } from 'src/app/service/auth.service';
import { FormControl } from '@angular/forms';
import { Food } from './food';

@Component({
  selector: 'fav-food',
  templateUrl: './sablonFood.component.html',
  styleUrls: ['./sablonFood.component.css',
  '../../../assets/css/bootstrap.min.css',
  '../../../assets/css/bootstrap-grid.css',],
})
export class FavFoodComponent implements OnInit {

  prodList: FavFood[]=[]
    @Input() favFood: FavFood
  mdlSampleIsOpen : boolean = false;

  stars = new FormControl('')

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
 
  }

  vote(i: number)
  {
    let vote = i;
    // this.stars.value;
    let s=this.favFood.rating
    s = Number(((s + vote) / 2).toFixed(2));
    this.favFood.rating=s
    let fav : Food={
      name: this.favFood.name,
      description: this.favFood.description,
      photo:this.favFood.photo,
      rating: this.favFood.rating,
      currentCat: this.favFood.currentCat,
      id: this.favFood.id,
    };
  
    const update: any = {};
    update[fav.id] = {
      ...fav,
    };
    delete update[fav.id].id;
      


      firestore().collection('products').doc(this.favFood.currentCat).update(update).finally(() => {
        this.mdlSampleIsOpen=false;
      })

    
  }


  sendHome() {
    this.router.navigate(['../home']);
  }

  openModal(open : boolean) : void {
    this.mdlSampleIsOpen = open;
  }
  hideBarLink: boolean = false;
  logged: boolean = this.auth.isLogged == false ? this.hideBarLink = false : this.hideBarLink = true;

}
