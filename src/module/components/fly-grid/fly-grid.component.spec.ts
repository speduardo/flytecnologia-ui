import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyGridComponent } from './fly-grid.component';

describe('FlyGridComponent', () => {
  let component: FlyGridComponent;
  let fixture: ComponentFixture<FlyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
