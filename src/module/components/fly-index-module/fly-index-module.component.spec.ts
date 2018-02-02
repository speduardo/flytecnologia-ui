import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyIndexModuleComponent } from './fly-index-module.component';

describe('FlyIndexModuleComponent', () => {
  let component: FlyIndexModuleComponent;
  let fixture: ComponentFixture<FlyIndexModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyIndexModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyIndexModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
