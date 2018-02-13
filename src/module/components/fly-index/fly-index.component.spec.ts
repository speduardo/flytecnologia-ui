import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyIndexComponent } from './fly-index.component';

describe('FlyIndexComponent', () => {
    let component: FlyIndexComponent;
    let fixture: ComponentFixture<FlyIndexComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlyIndexComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlyIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
