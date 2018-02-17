import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyInputImageUploadComponent } from './fly-input-image-upload.component';

describe('FlyInputImageUploadComponent', () => {
    let component: FlyInputImageUploadComponent;
    let fixture: ComponentFixture<FlyInputImageUploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlyInputImageUploadComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlyInputImageUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
