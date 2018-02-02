import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyInputDateComponent } from './fly-input-date.component';

describe('FlyInputDateComponent', () => {
  let component: FlyInputDateComponent;
  let fixture: ComponentFixture<FlyInputDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyInputDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
