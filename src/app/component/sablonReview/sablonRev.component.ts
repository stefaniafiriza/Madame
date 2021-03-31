import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
    selector: 'tab-group-basic-example',
    templateUrl: './sablonRev.component.html',
  })
  export class TabComponent implements OnInit {
  
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

}