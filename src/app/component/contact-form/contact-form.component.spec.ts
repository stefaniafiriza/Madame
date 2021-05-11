import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

import { ContactFormComponent } from './contact-form.component';
import { invalid } from '@angular/compiler/src/render3/view/util';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let name = 'aada';
  let email = 'asd@asd.com';
  let message = 'message';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ContactFormComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [AngularFireDatabase],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.FormData.valid).toBeFalsy();
  });

  it(`should have as text 'Send Us A Message'`, async () => {
    expect(component.text).toEqual('Send Us A Message');
  });

  it(`form should be invalid`, async () => {
    component.FormData.controls['name'].setValue('');
    component.FormData.controls['email'].setValue('');
    component.FormData.controls['message'].setValue('');
    expect(component.FormData.valid).toBeFalsy();
  });

  it(`form should be valid`, async () => {
    component.FormData.controls['name'].setValue(name);
    component.FormData.controls['email'].setValue(email);
    component.FormData.controls['message'].setValue(message);
    expect(component.FormData.valid).toBeTruthy();
  });

  it(`should call the onSubmit method`, async () => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should send message on submit', async (done) => {

    component.FormData.controls['name'].setValue(name);
    component.FormData.controls['email'].setValue(email);
    component.FormData.controls['message'].setValue(message);

    expect(component.FormData.value).toEqual({ name, email, message });
    
    await component.onSubmit()

    done();
  });
});