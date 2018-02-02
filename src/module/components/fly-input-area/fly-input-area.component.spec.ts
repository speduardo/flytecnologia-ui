import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyInputAreaComponent } from './fly-input-area.component';

describe('FlyInputAreaComponent', () => {
  let component: FlyInputAreaComponent;
  let fixture: ComponentFixture<FlyInputAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyInputAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyInputAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
