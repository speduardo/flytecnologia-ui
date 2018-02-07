import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { FlyUtilService } from '../../services/fly-util.service';
import { FlyBaseInput } from '../base/fly-base-input';
import { NgModel } from '@angular/forms';
import { ngModelProvider } from '../base/fly-abstract-ng-model';
import { FlyConfigService } from "../../confg/fly-config.service";
import { BsDatepickerConfig } from "ngx-bootstrap";

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
            this.dateInputFormat = configService.dateInputFormat;
        }

        this.bsConfig = Object.assign({}, {
            containerClass: this.configService.datePickerTheme
        });
    }

    ngOnInit(): void {
        super.ngOnInit();
    }
}
