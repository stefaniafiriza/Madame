import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './revForm.component.html',
  styleUrls: ['../../nav.css','../review/review.component.css']
})
export class RevFormComponent implements OnInit {


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
