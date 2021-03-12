import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../nav.css','./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
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

}
