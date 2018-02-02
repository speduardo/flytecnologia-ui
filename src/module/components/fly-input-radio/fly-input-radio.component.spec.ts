import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyInputRadioComponent } from './fly-input-radio.component';

describe('FlyInputRadioComponent', () => {
  let component: FlyInputRadioComponent;
  let fixture: ComponentFixture<FlyInputRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyInputRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyInputRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
