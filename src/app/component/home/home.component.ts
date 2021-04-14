import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../nav.css','./home.component.css']
})
export class HomeComponent implements OnInit {

  hideBarLink: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {
    if (this.cookie.get('usernameCookie').length != 0) {
      this.auth.isLogged = true;
      this.hideBarLink = true;
    }
  }

  sendRegister () {
    this.router.navigate(['/register']);
  }

  sendLogin () {
    this.router.navigate(['/login']);
  }
  
  sendTeam() {
    this.router.navigate(['../team']);
  }

  sendReview(){
    this.router.navigate(['./review']);
  }

  sendFav(){
    this.router.navigate(['./fav']);
  }

  
  logged: boolean = this.auth.isLogged == false ? this.hideBarLink = false : this.hideBarLink = true;

  logout() {
    this.auth.logout();
  }

  sendProfile () {
    this.router.navigate(['/profile']);
  }

  sendContact () {
    this.router.navigate(['/contact']);
  }

  sendOrder () {
    this.router.navigate(['/order']);
  }

}
