import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulartrendsComponent } from './populartrends.component';

describe('PopulartrendsComponent', () => {
  let component: PopulartrendsComponent;
  let fixture: ComponentFixture<PopulartrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulartrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulartrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
