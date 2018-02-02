import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyInputSelectComponent } from './fly-input-select.component';

describe('FlyInputSelectComponent', () => {
  let component: FlyInputSelectComponent;
  let fixture: ComponentFixture<FlyInputSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyInputSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyInputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
