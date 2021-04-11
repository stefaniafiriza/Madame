import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FavFood } from './favFood';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { database, firestore } from 'firebase';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'fav-food',
  templateUrl: './sablonFood.component.html',
  styleUrls: ['./sablonFood.component.css'],
})
export class FavFoodComponent implements OnInit {

  prodList: FavFood[]=[]
    @Input() favFood: FavFood

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    firestore().collection('producs').doc('products').get().then( (snapshot) => {
      this.snapshotToProdArray(snapshot.data());
    })
  }


  snapshotToProdArray(snapshot: firestore.DocumentData){

    Object.keys(snapshot).forEach((key)=>{
      let value = snapshot[key];
      this.prodList.push(
        {
          name: value.name,
          photo: value.photo,
          description: value.description,
          rating: value.rating,
        }
      )
    });
  }
  voteProduct()
  {
    let result = confirm("Do you want to vote this product?");
    if(result)
    {
      // OK
      window.alert(`You voted ${this.favFood.name}`);
      
        this.favFood.rating++
  
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
