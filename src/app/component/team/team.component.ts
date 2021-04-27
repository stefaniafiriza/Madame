import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { database, firestore } from 'firebase';
import { AuthService } from 'src/app/service/auth.service';
import { Staff } from '../sablon/staff';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['../../nav.css','./team.component.css']
})
export class TeamComponent implements OnInit {

  teamList : Staff[] = [
  // {name: "Chef Ivan", link : "google.com", photo: "assets\\image\\chef2.png", description: "Specialist in chinese food.", rating : 4.85},
  // {name: "Chef Betina", link : "google.com", photo: "assets\\image\\chef3.png", description: "Specialist in sea-food related recipes.", rating : 5}  
]


  constructor(
    private router: Router,
    private auth: AuthService,
    private cookie: CookieService

  ) {  }


  ngOnInit(): void {
    if (this.cookie.get('usernameCookie').length != 0) {
      this.auth.isLogged = true;
      this.hideBarLink = true;
    }
    firestore().collection('site').doc('chefs').get().then( (snapshot) => {
      this.snapshotToStaffArray(snapshot.data());
    })
  }

  snapshotToStaffArray(snapshot: firestore.DocumentData){

    Object.keys(snapshot).forEach((key)=>{
      let value = snapshot[key];
      this.teamList.push(
        {
          name: value.name,
          photo: value.photo,
          description: value.description,
          rating: value.rating,
          plus: value.plus,
          rez: value.rez,
          id: key
        }
      )
    });
  }

  sendHome(){
    this.router.navigate(['../']);
  }
  sendMenu(){
    this.router.navigate(['../dailymenu']);
  }
  sendRegister () {
    this.router.navigate(['/register']);
  }

  sendLogin () {
    this.router.navigate(['/login']);
  }
  sendFav(){
    this.router.navigate(['/mainFav']);
  }
  sendCareer(){
    this.router.navigate(['./join']);
  }
  sendContact(){
    this.router.navigate(['./contact']);
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
