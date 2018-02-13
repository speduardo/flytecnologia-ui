import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { FlyUtilService } from '../../services/fly-util.service';
import { FlyBaseInput } from '../base/fly-base-input';
import { NgModel } from '@angular/forms';
import { ngModelProvider } from '../base/fly-abstract-ng-model';

let nextUniqueId = 0;

@Component({
    selector: 'fly-input-area',
    templateUrl: './fly-input-area.component.html',
    styleUrls: ['./fly-input-area.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        ngModelProvider(FlyInputAreaComponent)
    ]
})
export class FlyInputAreaComponent extends FlyBaseInput implements AfterViewInit, OnInit {
    @Input() label: string;
    @Input() hideLabel: boolean;
    @Input() id = `fly-input-area-${nextUniqueId++}`;
    @Input() required = false;
    @Input() requiredConditional = false;
    @Input() placeholder = '';
    @Input() readonly = false;
    @Input() maxlength;
    @Input() minlength: number;
    @Input() spellcheck: boolean;
    @Input() showCount = false;
    @Input() rows = 4;
    @Input() selectOnTab: boolean;

    @ViewChild('inputHtml') inputHtml: ElementRef;

    @ViewChild('inputField') inputField: NgModel;

    constructor(private flyUtilService: FlyUtilService) {
        super(flyUtilService);
    }

    ngOnInit(): void {
        super.ngOnInit();

        if (!this.maxlength) {
            FlyUtilService.fieldRequired('maxlength');
        }
    }

    ngAfterViewInit(): void {

    }

    getTotal(): number {
        if (!this.inputField || !this.inputField.value) {
            return this.maxlength;
        }

        return this.maxlength - this.inputField.value.length;
    }
}
