import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  FormData: FormGroup;

  constructor(
    private builder: FormBuilder,
    private angularFire: AngularFireDatabase
  ) { 
    this.angularFire.list('messages').valueChanges();
    this.createForm(); 
  }

  ngOnInit(): void {
  }

  createForm() {
    this.FormData = this.builder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    const { name, email, message } = this.FormData.value;
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    let formRequest = { name, email, message, date, html };
    this.angularFire.list('/messages').push(formRequest);
    alert('Thank you for contacting us, your message has gone through!');
    this.FormData.reset();
  }

}
