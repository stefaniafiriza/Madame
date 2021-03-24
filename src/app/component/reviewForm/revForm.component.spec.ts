import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevFormComponent } from './revForm.component';

describe('RevFormComponent', () => {
  let component: RevFormComponent;
  let fixture: ComponentFixture<RevFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevFormComponent ]
    })
    .compileComponents();
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
