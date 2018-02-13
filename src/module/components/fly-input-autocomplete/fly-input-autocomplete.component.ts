import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgModel } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { MatDialog } from '@angular/material';

import { FlyUtilService } from '../../services/fly-util.service';
import { FlyBaseInput } from '../base/fly-base-input';
import { ngModelProvider } from '../base/fly-abstract-ng-model';
import { FlyConfigService } from '../../confg/fly-config.service';
import { FlyService } from '../../services/fly.service';
import { Observable } from 'rxjs/Observable';
import { FlyEntity } from '../../services/entity/fly-entity';


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
    @Input() selectOnTab: boolean
    @Input() itemTemplate: TemplateRef<any>;
    @Input() entityModel: FlyEntity;
    @Input() service: FlyService<any, any>;
    @Input() masterService: FlyService<any, any>;

    private _textTyped: string;

    typeaheadLoading: boolean;
    typeaheadNoResults: boolean;
    provider = [];

    @ViewChild('originalItemTemplate')
    originalItemTemplate: TemplateRef<any>;

    @ViewChild('inputHtml') inputHtml: ElementRef;
    @ViewChild('inputField') inputField: NgModel;

    constructor(private utilService: FlyUtilService,
                private configService: FlyConfigService,
                private dialog: MatDialog) {
        super(utilService);

        this.provider = Observable.create((observer: any) => {
            // Runs on every search
            observer.next(this.textTyped);
        }).mergeMap((token: string) => this.service.getListAutocomplete(token));
    }

    configSearchService() {
        this.service.matDialogService = this.dialog;
        this.service.onSetValueAutocomplete = (value, entity) => this.onSetValueAutocomplete(value, entity);

        this.service.masterService = this.masterService;
        this.service.masterService.cleanEvent.subscribe(
            () => this.service.cleanEntity()
        );
    }

    ngOnInit(): void {
        if (!this.masterService) {
            FlyUtilService.fieldRequired('masterService');
        } else {
            if (!this.entityModel && this.masterService.isPopupCrudDetail) {
                FlyUtilService.fieldRequired('entityModel');
            }
        }

        if (!this.service) {
            FlyUtilService.fieldRequired('service');
        }

        if (!this.itemTemplate) {
            this.itemTemplate = this.originalItemTemplate;
        }

        this.service.inputField = this.inputField;
        this.service.inputHtml = this.inputHtml;

        this.configSearchService();

        super.ngOnInit();
    }

    public checkValue(value: any): Date {
        return value;
    }

    openSearchPopup(): void {
        this.service.openPopupSearchForm();
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
        this.value = e.item[this.service.fieldValue];
    }

    onClickClean() {
        this.value = null;
    }

    public get textTyped(): string {
        return this._textTyped;
    }

    public set textTyped(value) {
        this._textTyped = value;
        this.value = null;
        this.service.cleanEntity();
    }

    _blur($event: any) {
        super._blur($event);

        if (!this.value) {
            this._textTyped = '';
        }
    }

    onSetValueAutocomplete(value: any, entity: any = null): void {
        this.value = value;

        if (entity) {
            if (!this.entityModel) {
                FlyUtilService.fieldRequired('entityModel');
            }
            /*_.merge(this.entityModel, entity);*/
            this.entityModel[this.service.fieldDescription] = entity[this.service.fieldDescription];
        }
    }

    onSetValue(value: any) {
        if (value) {
            this.service.getItemAutocomplete(value)
                .subscribe(
                    response => {
                        if (response) {
                            this._textTyped = response[this.service.fieldDescription];
                        } else {
                            this.textTyped = '';
                        }
                    },
                    () => {
                        this.textTyped = '';
                    });
        }
    }

    hightlight(match: TypeaheadMatch, query: any): string {
        let itemStr: string = match.value;
        let itemStrHelper: string = (itemStr).toLowerCase();
        let startIdx: number;
        let tokenLen: number;
        // Replaces the capture string with the same string inside of a "strong" tag
        if (typeof query === 'object') {
            const queryLen: number = query.length;
            for (let i = 0; i < queryLen; i += 1) {
                // query[i] is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query[i]);
                tokenLen = query[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr =
                        `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
                        `${itemStr.substring(startIdx + tokenLen)}`;
                    itemStrHelper =
                        `${itemStrHelper.substring(0, startIdx)}        ${' '.repeat(tokenLen)}         ` +
                        `${itemStrHelper.substring(startIdx + tokenLen)}`;
                }
            }
        } else if (query) {
            // query is already latinized and lower case
            startIdx = itemStrHelper.indexOf(query);
            tokenLen = query.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr =
                    `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
                    `${itemStr.substring(startIdx + tokenLen)}`;
            }
        }

        return itemStr;
    }
}
