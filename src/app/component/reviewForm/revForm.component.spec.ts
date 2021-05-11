import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { inject, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RevFormComponent } from './revForm.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

describe('RevFormComponentCreation', () => {
  let component: RevFormComponent;
  let fixture: ComponentFixture<RevFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      declarations: [RevFormComponent],
      providers: [AngularFirestore],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

fdescribe('RevFormComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
  let subject: RevFormComponent;
  let name = 'Nume de test';
  let revtext = 'Test test test';
  let stars = 4.5;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RevFormComponent, AngularFirestore],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
    });
  });
  beforeEach(inject([RevFormComponent], (revForm: RevFormComponent) => {
    subject = revForm;

    subject.name.setValue(name);
    subject.reviewText.setValue(revtext);
    subject.stars.setValue(stars);
  }));

  it('should send review on submit', async (done) => {
    
    let update = await subject.review(false);
    expect(Object.keys(update).length).toEqual(1);
    expect(update[Object.keys(update)[0]].name).toEqual(name);
    expect(update[Object.keys(update)[0]].review).toEqual(revtext);
    expect(update[Object.keys(update)[0]].stars).toEqual(stars);
    await subject.removeReview(Object.keys(update)[0]);
    done();
  });
});