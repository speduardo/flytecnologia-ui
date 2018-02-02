import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyFormSearchComponent } from './fly-form-search.component';

describe('FlyFormSearchComponent', () => {
  let component: FlyFormSearchComponent;
  let fixture: ComponentFixture<FlyFormSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyFormSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyFormSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
