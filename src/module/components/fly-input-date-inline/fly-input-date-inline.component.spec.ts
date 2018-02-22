import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyInputDateInlineComponent } from './fly-input-date-inline.component';

describe('FlyInputDateInlineComponent', () => {
  let component: FlyInputDateInlineComponent;
  let fixture: ComponentFixture<FlyInputDateInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyInputDateInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyInputDateInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
