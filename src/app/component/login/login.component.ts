import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AuthService } from '../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string;
  password: string;
  error: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private cookie: CookieService
  ){ }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe( error => {
      this.error = error;
      });
  }

  login() {
    this.auth.login(this.email, this.password);
  }

  sendHome() {
    this.router.navigate(['']);

  }

  sendForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  googleConnect() {
    this.auth.GoogleAuth();
  }

  facebookConnect() {
    this.auth.FacebookAuth();
  }

}
