import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyFormCrudComponent } from './fly-form-crud.component';

describe('FlyFormCrudComponent', () => {
  let component: FlyFormCrudComponent;
  let fixture: ComponentFixture<FlyFormCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyFormCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyFormCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
