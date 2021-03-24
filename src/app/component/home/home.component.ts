import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../nav.css','./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
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

  hideBarLink: boolean = false;
  logged: boolean = this.auth.isLogged == false ? this.hideBarLink = false : this.hideBarLink = true;

  logout() {
    this.auth.logout();
  }

  sendProfile () {
    this.router.navigate(['/profile']);
  }

}
