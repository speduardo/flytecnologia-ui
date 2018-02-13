import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgModel } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

import { FlyUtilService } from '../../services/fly-util.service';
import { FlyBaseInput } from '../base/fly-base-input';
import { ngModelProvider } from '../base/fly-abstract-ng-model';
import { FlyConfigService } from '../../confg/fly-config.service';

import * as moment from 'moment';

let nextUniqueId = 0;

@Component({
    selector: 'fly-input-date',
    templateUrl: './fly-input-date.component.html',
    styleUrls: ['./fly-input-date.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        ngModelProvider(FlyInputDateComponent)
    ]
})
export class FlyInputDateComponent extends FlyBaseInput implements OnInit {
    @Input() label: string;
    @Input() hideLabel: boolean;
    @Input() id = `fly-input-date-${nextUniqueId++}`;
    @Input() required = false;
    @Input() requiredConditional = false;
    @Input() placeholder = '';
    @Input() readonly = false;
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() selectOnTab: boolean;
    @Input() dateInputFormat;

    @ViewChild('inputHtml') inputHtml: ElementRef;

    @ViewChild('inputField') inputField: NgModel;

    bsConfig: Partial<BsDatepickerConfig>;

    constructor(private utilService: FlyUtilService,
                private configService: FlyConfigService) {
        super(utilService);

        if (!this.dateInputFormat) {
            this.dateInputFormat = configService.dateInputFormat.toUpperCase();
        }

        this.bsConfig = Object.assign({}, {
            containerClass: this.configService.datePickerTheme,
            dateInputFormat: this.dateInputFormat
        });
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    public checkValue(value: any): Date {
        if (value && typeof value === 'string') {
            if (value.indexOf('-') >= 0) {
                value = moment(value, 'YYYY-MM-DD').toDate();
            } else {
                value = moment(value, 'DD/MM/YYYY').toDate();
            }
        }

        return value;
    }

}
