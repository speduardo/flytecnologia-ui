import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyInputCheckboxComponent } from './fly-input-checkbox.component';

describe('FlyInputCheckboxComponent', () => {
  let component: FlyInputCheckboxComponent;
  let fixture: ComponentFixture<FlyInputCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyInputCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyInputCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
