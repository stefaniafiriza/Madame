import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  error: any;

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe(error => {
      this.error = error;
    });
  }

  resetPassword(passwordResetEmail) {
    this.auth.forgotPassword(passwordResetEmail);
  }

  sendHome() {
    this.router.navigate(['']);
  }

}
