import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { BookChef } from './chef';
import { Staff } from './staff';
import { firestore } from 'firebase';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'personal-staff',
  templateUrl: './sablon.component.html',
  styleUrls: [
    './sablon.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/bootstrap-grid.css',
  ],
})
export class StaffComponent implements OnInit {
  hideBarLink: boolean = false;
  @Input() staff: Staff;
  mdlSampleIsOpen: boolean = false;
  sampleIsOpen: boolean = false;
  ampleIsOpen: boolean = false;
  user: User | null = null;
  selected = 0;
  hovered = 0;
  readonly = false;
  rezervari: BookChef[] = [];
  

  address = new FormControl('');
  date = new FormControl('');
  name = new FormControl('');
  phone = new FormControl('');

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

  book() {
    const bookChef: BookChef = {
      name: this.user !== null ? this.user.Name : this.name.value,
      date: this.date.value,
      address: this.address.value,
      phone: this.phone.value,
    };

    this.rezervari.push(bookChef);

    this.staff.rez = bookChef;
    let book: Staff = {
      name: this.staff.name,
      description: this.staff.description,
      rez: this.rezervari,
      plus: this.staff.plus,
      photo: this.staff.photo,
      rating: this.staff.rating,
      id: this.staff.id,
    };

    const update: any = {};
    update[book.id] = {
      ...book,
    };

    delete update[book.id].id;

    firestore()
      .collection('site')
      .doc('chefs')
      .update(update)
      .finally(() => {
        this.sampleIsOpen = false;
      });
  }

  sendBook() {}

  openModal(open: boolean): void {
    this.sampleIsOpen = false;
    this.ampleIsOpen=false;
    this.mdlSampleIsOpen = open;
  }
  openModalNou(open: boolean): void {
    this.sampleIsOpen = open;
    this.ampleIsOpen = false;
    this.mdlSampleIsOpen = false;
  }
  openModalVote(open: boolean): void {
    this.ampleIsOpen = open;
    this.sampleIsOpen = false;
    this.mdlSampleIsOpen = false;
  }
  vote(i: number){
    let vote = i;
    let s = this.staff.rating;
    s = Number(((s + vote) / 2).toFixed(2));
    this.staff.rating = s;
    let fav: Staff = {
      name: this.staff.name,
      description: this.staff.description,
      photo: this.staff.photo,
      rating: this.staff.rating,
      rez: this.staff.rez,
      plus: this.staff.plus,
      id: this.staff.id,
    };

    const update: any = {};
    update[fav.id] = {
      ...fav,
    };
    delete update[fav.id].id;

    firestore()
      .collection('site')
      .doc('chefs')
      .update(update)
      .finally(() => {
        this.ampleIsOpen = false;
      });
  }

  sendBookchef() {
    this.mdlSampleIsOpen = false;
    this.openModalNou(true);
  }
  voteChef() {
    this.sampleIsOpen = false;
    this.openModalVote(true);
  }
  close() {
    this.openModal(false);
    this.openModalNou(false);
    this.openModalVote(false);
  }
  sendHome() {
    this.router.navigate(['../home']);
  }

  logged: boolean =
    this.auth.isLogged == false
      ? (this.hideBarLink = false)
      : (this.hideBarLink = true);
}
