import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { BookChef } from './chef';
import { Staff } from './staff';
import { v4 as uuid } from 'uuid';
import { firestore } from 'firebase';

@Component({
  selector: 'personal-staff',
  templateUrl: './sablon.component.html',
  styleUrls: ['./sablon.component.css',
  '../../../assets/css/bootstrap.min.css',
  '../../../assets/css/bootstrap-grid.css',
],
})
export class StaffComponent implements OnInit {
  
  @Input() staff: Staff
  mdlSampleIsOpen : boolean = false;
  sampleIsOpen : boolean = false;

  user: User | null = null;


  address = new FormControl('')
  date = new FormControl('')
  name = new FormControl('')
  phone = new FormControl('')

  constructor(
    private router: Router
    ) {}
    
    ngOnInit(): void {
      
      
    }
    
  
 
    book() {
      let bookChef: BookChef = {
        name: this.user !== null ? this.user.Name : this.name.value,
        date: this.date.value,
        address: this.address.value,
        phone: this.phone.value,
        id: uuid(),
      };
  
      const update: any = {};
      update[bookChef.id] = {
        ...bookChef,
      };
      
      delete update[bookChef.id].id;
      
      firestore().collection('site').doc('book').update(update).finally(() => {
        this.sampleIsOpen = false;
      })
      
    }
    
  
  sendBook(){
  
    //     if(this.staff.booked == 0){

    //  let result = confirm("Do you want to book this chef?");
    //   if(result)
    //   {
    //     this.staff.booked=1;
    //     alert(`You booked ${this.staff.name}, he will arive shortly`);
    //   }
    //   else
    //   {
    //     // RETURN
    //   }
    // }
    // else{
    //   alert(`This chef has already been booked.`)
    // }
    
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

}
