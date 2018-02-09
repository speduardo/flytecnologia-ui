import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgModel } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';

import { FlyUtilService } from '../../services/fly-util.service';
import { FlyBaseInput } from '../base/fly-base-input';
import { ngModelProvider } from '../base/fly-abstract-ng-model';
import { FlyConfigService } from '../../confg/fly-config.service';
import { FlyService } from '../../services/fly.service';


let nextUniqueId = 0;

@Component({
    selector: 'fly-input-autocomplete',
    templateUrl: './fly-input-autocomplete.component.html',
    styleUrls: ['./fly-input-autocomplete.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        ngModelProvider(FlyInputAutocompleteComponent)
    ]
})
export class FlyInputAutocompleteComponent extends FlyBaseInput implements OnInit {
    @Input() label: string;
    @Input() hideLabel: boolean;
    @Input() id = `fly-input-autocmplete-${nextUniqueId++}`;
    @Input() required = false;
    @Input() requiredConditional = false;
    @Input() placeholder = '';
    @Input() readonly = false;
    @Input() selectOnTab: boolean;
    @Input() service: FlyService<any, any>;

    selected: string;
    asyncSelected: string;
    typeaheadLoading: boolean;
    typeaheadNoResults: boolean;
    provider = [];

    @ViewChild('inputHtml') inputHtml: ElementRef;
    @ViewChild('inputField') inputField: NgModel;

    constructor(private utilService: FlyUtilService,
                private configService: FlyConfigService) {
        super(utilService);
    }


    ngOnInit(): void {
        super.ngOnInit();
    }

    public checkValue(value: any): Date {

        return value;
    }

    openSearchPopup(): void {

    }

    openCrudPopup(): void {

    }

    changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }

    changeTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
    }

    typeaheadOnSelect(e: TypeaheadMatch): void {
        this.value = e.value;
        console.log('Selected value: ', e.value);
    }
}
