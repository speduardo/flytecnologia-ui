import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyFormDefaultComponent } from './fly-form-default.component';

describe('FlyFormDefaultComponent', () => {
  let component: FlyFormDefaultComponent;
  let fixture: ComponentFixture<FlyFormDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyFormDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyFormDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
