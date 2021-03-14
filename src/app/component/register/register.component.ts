import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  error: any;
  confirmPassword: any;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { 
    this.user = {
      Name: '',
      password: '',
      email: '',
      phone: 407,
      address: '',
      products: [],
      photo: ''
    };
  }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe(error => {
      this.error = error;
    })
  }

  registerUser () {
    this.auth.registerUser(this.user);
  }

  sendLogin () {
    this.router.navigate(['/login']);
  }

  sendHome(){
    this.router.navigate(['/home']);
  }
}
