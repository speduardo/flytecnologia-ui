import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyInputUploadImagemComponent } from './fly-input-upload-imagem.component';

describe('FlyInputUploadImagemComponent', () => {
    let component: FlyInputUploadImagemComponent;
    let fixture: ComponentFixture<FlyInputUploadImagemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlyInputUploadImagemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlyInputUploadImagemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
