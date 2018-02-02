import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlyFormService } from '../service/fly-form.service';

@Component({
    selector: 'fly-form-processing',
    templateUrl: './fly-form-processing.component.html',
    styleUrls: ['./fly-form-processing.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FlyFormProcessingComponent extends FlyFormService implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
