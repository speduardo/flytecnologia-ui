import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyFormProcessingComponent } from './fly-form-processing.component';

describe('FlyFormProcessingComponent', () => {
  let component: FlyFormProcessingComponent;
  let fixture: ComponentFixture<FlyFormProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyFormProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyFormProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
