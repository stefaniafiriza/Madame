import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
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
    let result = confirm("Do you want to book this chef?");
    if(result)
    {
      // OK
      alert(`You booked ${this.staff.name}, he will arive shortly`);
    }
    else
    {
      // RETURN
    }
  }


  sendHome() {
    this.router.navigate(['../home']);
  }

}
