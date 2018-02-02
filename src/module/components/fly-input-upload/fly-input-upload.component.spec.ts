import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyInputUploadComponent } from './fly-input-upload.component';

describe('FlyInputUploadComponent', () => {
  let component: FlyInputUploadComponent;
  let fixture: ComponentFixture<FlyInputUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyInputUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyInputUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
