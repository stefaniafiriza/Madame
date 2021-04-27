import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavFoodComponent } from './sablonFood.component';

describe('ReviewComponent', () => {
  let component: FavFoodComponent;
  let fixture: ComponentFixture<FavFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
