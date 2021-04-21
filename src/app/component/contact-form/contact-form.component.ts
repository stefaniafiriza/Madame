import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  FormData: FormGroup;

  constructor(
    private builder: FormBuilder,
    private angularFire: AngularFireDatabase,
    private auth: AuthService,
    private router: Router,
    private cookie: CookieService
  ) { 
    this.angularFire.list('messages').valueChanges();
    this.createForm(); 
  }

  ngOnInit(): void {
    if (this.cookie.get('usernameCookie').length != 0) {
      this.auth.isLogged = true;
      this.hideBarLink = true;
    }
  }

  name: string = this.cookie.get('nameUserCookie');
  email: string = this.cookie.get('usernameCookie');

  createForm() {

    if (this.auth.isLogged == true) {
      this.FormData = this.builder.group({
        name: [this.name],
        email: [this.email],
        message: ['', Validators.required],
      });
    } else {
      this.FormData = this.builder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        message: ['', Validators.required],
      });
    }
  }

  onSubmit() {
    const { name, email, message } = this.FormData.value;
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    let formRequest = { name, email, message, date, html };
    this.angularFire.list('/messages').push(formRequest);
    alert('Thank you for contacting us, your message has gone through!');
    this.FormData.reset();
  }

  hideBarLink: boolean = false;
  logged: boolean = this.auth.isLogged == false ? this.hideBarLink = false : this.hideBarLink = true;

  sendProfile () {
    this.router.navigate(['/profile']);
  }

  sendHome () {
    this.router.navigate(['/home']);
  }

  back () {
    this.router.navigate(['']);
  }

  logout() {
    this.auth.logout();
  }

  sendOrder () {
    this.router.navigate(['/order']);
  }

  sendDailyMenu() {
    this.router.navigate(['/dailymenu']);
  }

}
