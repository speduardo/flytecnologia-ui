import { AfterViewInit, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { FlyService } from '../../services/fly.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

export abstract class FlyFormService implements AfterViewInit {
    @ContentChildren(NgModel) public models: QueryList<NgModel>;
    @ViewChild('flyForm') flyForm: NgForm;
    @Input() service: FlyService<any, any>;

    isDefaultValuesAvalilable = false;

    constructor() {
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            const ngContentModels = this.models.toArray();

            ngContentModels.forEach((model) => {
                this.flyForm.addControl(model);
            });

        }, 100);

    }

    onMoveScrool(): Observable<boolean> {
        return Observable
            .fromEvent(window, 'scroll')
            .throttleTime(100)
            .map(Boolean);
    }
}
