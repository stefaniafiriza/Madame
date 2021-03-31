import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Staff } from './staff';

@Component({
  selector: 'personal-staff',
  templateUrl: './sablon.component.html',
  styleUrls: ['./sablon.component.css'],
})
export class StaffComponent implements OnInit {

    @Input() staff: Staff

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    
    
  }

  
  
  bookCook()
  {

     if(this.staff.booked == 0){

      let result = confirm("Do you want to book this chef?");
      if(result)
      {
        this.staff.booked=1;
        alert(`You booked ${this.staff.name}, he will arive shortly`);
      }
      else
      {
        // RETURN
      }
    }
    else{
      alert(`This chef has already been booked.`)
    }
  }


  sendHome() {
    this.router.navigate(['../home']);
  }

}
