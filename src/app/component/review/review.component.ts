import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CommonModule } from '@angular/common'

import { Review } from './review';
import { firestore } from 'firebase';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['../../nav.css','./review.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ReviewComponent implements OnInit {
  
  hideBarLink: boolean = false;
  logged: boolean = this.auth.isLogged == false ? this.hideBarLink = false : this.hideBarLink = true;

  reviews : Review [] = [{name:'', review:'', stars: 0, id: '0'}]// [ { nume:"Georgica", review: "A very nice place", stars: 5 }, {nume:"Andi", review: "Very tasty food", stars: 4.5 }];
  currentReview: number = 0;

  
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    firestore().collection('site').doc('reviews').get().then( (snapshot) => {
      this.snapshotToReviewArray(snapshot.data());
    })
  }

  snapshotToReviewArray(snapshot: firestore.DocumentData){
    
    Object.keys(snapshot).forEach((key)=>{
      let value = snapshot[key];
      this.reviews.push(
        {
          name: value.name,
          review: value.review,
          stars: value.stars,
          id: key
        }
      )
    });
    this.reviews.shift();
  }

  openPage(id){

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
    this.router.navigate(['../mainFav']);
  }
  sendTeam(){
    this.router.navigate(['/team']);
  }

  logout() {
    this.auth.logout();
  }

  sendRev(){
    this.router.navigate(['./rev']);
  }

  nextReview()
  {
    this.currentReview=(this.currentReview+1)%this.reviews.length;
 }
}
