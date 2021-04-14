import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { database, firestore } from 'firebase';
import { AuthService } from 'src/app/service/auth.service';
import { FavFood } from '../sablonFood/favFood';
import { elementAt } from 'rxjs/operators';
@Component({
  selector: 'app-favourites',
  templateUrl: './mainFav.component.html',
  styleUrls: ['../../nav.css',
'../favourites/favourites.component.css']
})
export class MainFavComponent implements OnInit {

  productList : FavFood[] = [
  //    {name:"Salad",photo:"assets\\image\\food6.png",description: "Extra fresh salad.",rating: 5},
  // {name:"Burger",photo:"assets\\image\\burger.png",description: "A very tasty burger",rating: 4.95},
  // {name:"Chicken",photo:"assets\\image\\food1.png",description: "Honey glazed chicken",rating: 4.8}

]
productListName: String[]= [
    "pizza","drinks"
];

  databaseRef: database.Reference;
  

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

 
 

  ngOnInit(): void {
          
  }

  populate(i : number) : void {
     
    if(i==0){

        firestore().collection('products').doc('pizza').get().then( (snapshot) => {
            this.snapshotToStaffArray(snapshot.data());
        })
    }
    else if(i==1){

        firestore().collection('products').doc('drink').get().then( (snapshot) => {
            this.snapshotToStaffArray(snapshot.data());
        })
    }
      
  }

  snapshotToStaffArray(snapshot: firestore.DocumentData){

    Object.keys(snapshot).forEach((key)=>{
      let value = snapshot[key];
      this.productList.push(
        {
          name: value.name,
          photo: value.photo,
          description: value.description,
          rating: value.rating, 
          id: key
        }
      )
    });
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
  sendTeam(){
    this.router.navigate(['./team']);
  }
  sendReview(){
    this.router.navigate(['./review']);
  }

  hideBarLink: boolean = false;
  logged: boolean = this.auth.isLogged == false ? this.hideBarLink = false : this.hideBarLink = true;

  logout() {
    this.auth.logout();
  }
}
