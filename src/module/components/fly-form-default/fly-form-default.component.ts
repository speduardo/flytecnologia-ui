import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlyFormService } from '../service/fly-form.service';

@Component({
    selector: 'fly-form-default',
    templateUrl: './fly-form-default.component.html',
    styleUrls: ['./fly-form-default.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FlyFormDefaultComponent extends FlyFormService implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
