import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyButtonIconComponent } from './fly-button-icon.component';

describe('FlyButtonIconComponent', () => {
  let component: FlyButtonIconComponent;
  let fixture: ComponentFixture<FlyButtonIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyButtonIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
