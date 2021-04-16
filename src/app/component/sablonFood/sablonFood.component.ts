import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FavFood } from './favFood';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { database, firestore } from 'firebase';
import { AuthService } from 'src/app/service/auth.service';
import { FormControl } from '@angular/forms';
import { v4 as uuid } from 'uuid';
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
    // firestore().collection('producs').doc('products').get().then( (snapshot) => {
    //   this.snapshotToProdArray(snapshot.data());
    // })
  }


  // snapshotToProdArray(snapshot: firestore.DocumentData){

  //   Object.keys(snapshot).forEach((key)=>{
  //     let value = snapshot[key];
  //     this.prodList.push(
  //       {
  //         name: value.name,
  //         photo: value.photo,
  //         description: value.description,
  //         rating: value.rating,
  //       }
  //     )
  //   });
  // }
  voteProduct()
  {

    let vote = this.stars.value;
    let s=this.favFood.rating
    s=(s+vote)/2
    this.favFood.rating=s
    let fav : Food={
      name: this.favFood.name,
      description: this.favFood.description,
      photo:this.favFood.photo,
      rating: this.favFood.rating,
      id: this.favFood.id,
    };
    console.log(fav.id)

 

    const update: any = {};
    update[fav.id] = {
      ...fav,
    };
    delete update[fav.id].id;
      


      firestore().collection('products').doc('products').update(update).finally(() => {
        this.mdlSampleIsOpen=false;
      })

    
  }


  sendHome() {
    this.router.navigate(['../home']);
  }

  openModal(open : boolean) : void {
    this.mdlSampleIsOpen = open;
  }
}
