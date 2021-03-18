import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/service/auth.service';
import { Staff } from '../sablon/staff';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['../../nav.css','./team.component.css']
})
export class TeamComponent implements OnInit {

  teamList : Staff[] = [ {name: "Chef A", link : "google.com", photo: "assets\\image\\a.png", description: "A very good chef", rating : 4},
  {name: "Chef B", link : "google.com", photo: "assets\\image\\a.png", description: "A very good chef", rating : 5},
  {name: "Chef B", link : "google.com", photo: "assets\\image\\a.png", description: "A very good chef", rating : 5}  ]


  constructor(
    private router: Router,
    private auth: AuthService
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
  sendFav(){
    this.router.navigate(['/fav']);
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
