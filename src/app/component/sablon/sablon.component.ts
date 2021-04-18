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
  styleUrls: ['./sablon.component.css',
  '../../../assets/css/bootstrap.min.css',
  '../../../assets/css/bootstrap-grid.css',
],
})
export class StaffComponent implements OnInit {
  
  hideBarLink: boolean = false;
  @Input() staff: Staff
  mdlSampleIsOpen : boolean = false;
  sampleIsOpen : boolean = false;

  user: User | null = null;
  
  rezervari:BookChef[]=[];
  
  address = new FormControl('')
  date = new FormControl('')
  name = new FormControl('')
  phone = new FormControl('')
  
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

      this.staff.rez=bookChef;
      let book: Staff={
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
      

     
      firestore().collection('site').doc('chefs').update(
       update
      ).finally(() => {
        this.sampleIsOpen = false;
      })
      
    }
    
  
  sendBook(){    
  }

openModal(open : boolean) : void {
  this.mdlSampleIsOpen = open;
}
openModalNou(open : boolean) : void {
  this.sampleIsOpen = open;
}

sendBookchef() {
  this.mdlSampleIsOpen = false;
  this.openModalNou(true)
  // this.router.navigate(['../book-chef']);
}

sendHome() {
    this.router.navigate(['../home']);
  }

  logged: boolean = this.auth.isLogged == false ? this.hideBarLink = false : this.hideBarLink = true;

}
