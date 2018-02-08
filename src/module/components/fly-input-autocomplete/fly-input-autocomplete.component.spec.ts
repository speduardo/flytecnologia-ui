import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyInputAutocompleteComponent } from './fly-input-autocomplete.component';

describe('FlyInputAutocompleteComponent', () => {
  let component: FlyInputAutocompleteComponent;
  let fixture: ComponentFixture<FlyInputAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyInputAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyInputAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
