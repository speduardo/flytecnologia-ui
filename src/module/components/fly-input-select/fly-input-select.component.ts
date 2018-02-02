import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { FlyUtilService } from '../../services/fly-util.service';
import { FlyBaseInput } from '../base/fly-base-input';
import { ngModelProvider } from '../base/fly-abstract-ng-model';

let nextUniqueId = 0;

@Component({
    selector: 'fly-input-select',
    templateUrl: './fly-input-select.component.html',
    styleUrls: ['./fly-input-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        ngModelProvider(FlyInputSelectComponent)
    ]
})
export class FlyInputSelectComponent extends FlyBaseInput implements OnInit {
    @Input() label: string;
    @Input() hideLabel: boolean;
    @Input() id = `fly-input-select-${nextUniqueId++}`;
    @Input() required = false;
    @Input() requiredConditional = false;
    @Input() readonly = false;
    @Input() placeholder = 'Selecione...';
    @Input() fieldName = 'descricao';
    @Input() fieldValue = 'valor';

    @Input() provider: Array<any> = [];

    @ViewChild('inputHtml') inputHtml: ElementRef;

    constructor(private flyUtilService: FlyUtilService) {
        super(flyUtilService);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }
}
