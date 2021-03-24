import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['../../nav.css','./review.component.css']
})
export class ReviewComponent implements OnInit {


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
  sendTeam(){
    this.router.navigate(['./team']);
  }

  hideBarLink: boolean = false;
  logged: boolean = this.auth.isLogged == false ? this.hideBarLink = false : this.hideBarLink = true;
  
  logout() {
    this.auth.logout();
  }

  sendRev(){
    this.router.navigate(['./rev']);
  }
}
