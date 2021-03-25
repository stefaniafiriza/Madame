import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { database } from 'firebase';
import { AuthService } from 'src/app/service/auth.service';
import { FavFood } from '../sablonFood/favFood';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['../../nav.css','./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  productList : FavFood[] = [ {name:"Salad",photo:"assets\\image\\food6.png",description: "Extra fresh salad.",rating: 5},
  {name:"Burger",photo:"assets\\image\\burger.png",description: "A very tasty burger",rating: 4.95},
  {name:"Chicken",photo:"assets\\image\\food1.png",description: "Honey glazed chicken",rating: 4.8}]

  databaseRef: database.Reference;
  

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {

    this.databaseRef = database().ref("favfood/");

    this.databaseRef.on("value",(snapshot)=>{
      this.snapshotToStaffArray(snapshot);
    },(error)=>{

    }); 
  }
  snapshotToStaffArray(snapshot: database.DataSnapshot){
    let json = snapshot.toJSON();
    Object.keys(json).forEach((key)=>{
      let value = json[key];
      this.productList.push(
        {
          name: value.name,
          photo: value.photo,
          description: value.description,
          rating: value.rating
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
