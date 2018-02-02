import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlyFormService } from '../service/fly-form.service';

@Component({
    selector: 'fly-form-report',
    templateUrl: './fly-form-report.component.html',
    styleUrls: ['./fly-form-report.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FlyFormReportComponent extends FlyFormService implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
