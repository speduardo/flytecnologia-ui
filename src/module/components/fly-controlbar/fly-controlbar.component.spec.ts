import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyControlbarComponent } from './fly-controlbar.component';

describe('FlyControlbarComponent', () => {
  let component: FlyControlbarComponent;
  let fixture: ComponentFixture<FlyControlbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyControlbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyControlbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
