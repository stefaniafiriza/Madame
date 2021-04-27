import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFavComponent } from './mainFav.component';

describe('MainFavComponent', () => {
  let component: MainFavComponent;
  let fixture: ComponentFixture<MainFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainFavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
