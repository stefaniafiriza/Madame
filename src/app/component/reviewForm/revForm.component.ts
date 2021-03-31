import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { database, firestore } from 'firebase';
import { AuthService } from '../../service/auth.service';
import { Review } from '../review/review';
import { v4 as uuid } from 'uuid';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './revForm.component.html',
  styleUrls: ['../../nav.css', './review.component.css'],
})
export class RevFormComponent implements OnInit {
  user: User | null = null;


  reviewText = new FormControl('')
  stars = new FormControl(5)
  name = new FormControl('')

  constructor(private router: Router) // private auth: AuthService
  {}
  ngOnInit(): void {
    
  }

  review() {
    let rev: Review = {
      name: this.user !== null ? this.user.Name : this.name.value,
      review: this.reviewText.value,
      stars: this.stars.value,
      id: uuid(),
    };

    const update: any = {};
    update[rev.id] = {
      ...rev,
    };

    delete update[rev.id].id;

    firestore().collection('site').doc('reviews').update(update).finally(() => {
      this.sendReview()
    })
    
  }
  sendReview() {
    this.router.navigate(['./review']);
  }
}
