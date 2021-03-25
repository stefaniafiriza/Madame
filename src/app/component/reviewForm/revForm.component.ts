import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './revForm.component.html',
  styleUrls: ['../../nav.css','./review.component.css']
})
export class RevFormComponent implements OnInit {

  user: User;
  constructor(
    private router: Router,
    private auth: AuthService
  ) { 
  }
  ngOnInit(): void {
    
  }

  review(){
  }
  sendReview(){
    this.router.navigate(['./review']);

  }
}
