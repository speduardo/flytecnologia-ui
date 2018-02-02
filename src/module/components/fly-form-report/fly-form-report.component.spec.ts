import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyFormReportComponent } from './fly-form-report.component';

describe('FlyFormReportComponent', () => {
  let component: FlyFormReportComponent;
  let fixture: ComponentFixture<FlyFormReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyFormReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyFormReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
