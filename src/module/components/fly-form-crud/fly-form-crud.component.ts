import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FlyFormService } from '../service/fly-form.service';
import { FlyModalCrudData } from '../../services/fly-modal.service';
import { FlyUtilService } from '../../services/fly-util.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'fly-form-crud',
    templateUrl: './fly-form-crud.component.html',
    styleUrls: ['./fly-form-crud.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('controlbar', [
            state('normal', style({opacity: 1})),
            transition('normal => fixed', animate('300ms 0s ease-in', keyframes([
                style({opacity: 0, transform: 'translateX(-30px)', offset: 0}),
                style({opacity: 1, transform: 'translateX(0px)', offset: 1})
            ]))),
            transition('fixed => normal', animate('300ms 0s ease-out', keyframes([
                style({opacity: 0, transform: 'translateX(30px)', offset: 0}),
                style({opacity: 1, transform: 'translateX(0px)', offset: 1})
            ])))
        ])
    ]
})
export class FlyFormCrudComponent extends FlyFormService implements OnInit, OnDestroy, AfterViewInit {
    routerSubscription: Subscription;
    scrollSubscription: Subscription;

    @Input() labelSaveButton = 'SALVAR';
    @Input() labelResetButton = 'LIMPAR';
    @Input() labelRemoveButton = 'EXCLUIR';
    @Input() labelSaveAndCloseButton = ' E FECHAR';
    @Input() labelSaveAndCleanButton = ' E LIMPAR';

    controlbarState = 'normal';

    @ViewChild('cmark') cmark: ElementRef;

    isMarksInViewPort = true;

    constructor(private route: ActivatedRoute,
                @Optional() @Inject(MAT_DIALOG_DATA) public modalCrudData: FlyModalCrudData) {
        super();
    }

    ngOnInit() {
        const thisAux = this;

        setTimeout(() => {
            if (!this.modalCrudData) {
                this.routerSubscription = this.route.params.subscribe(params => {
                    if (params['id']) {
                        thisAux.service.findById(Number(params['id'])).subscribe();
                    }
                });
            }

            this.service.isFormCrud = true;

            this.service.gridMasterService = this.modalCrudData ? this.modalCrudData.gridService : null;
            this.service.autoCompleteMasterService = this.modalCrudData ? this.modalCrudData.autocompleteService : null;
            this.service.isPopupCrudDetail = !!this.service.gridMasterService;
            this.service.isPopupCrudAutoComplete = !!this.service.autoCompleteMasterService;
            this.service.isPopup = this.service.isPopupCrudDetail || this.service.isPopupCrudAutoComplete;

            if (this.service.isPopupCrudDetail) {
                this.service.modalCrudRef = this.service.gridMasterService.modalCrudRef;

                if (!this.service.gridMasterService.masterService.entity.id) {
                    this.labelSaveButton = 'ADICIONAR';
                }
            } else if (this.service.isPopupCrudAutoComplete) {
                this.service.modalCrudRef = this.service.autoCompleteMasterService.modalCrudRef;
            }
        }, 0);

        this.service.loadDefaultValuesCrud().subscribe(
            () => {
                this.isDefaultValuesAvalilable = true;

                setTimeout(() => {
                    this.service.form = this.flyForm;
                    this.service.onInitForm();

                    if (this.modalCrudData) {
                        if (this.modalCrudData.id) {
                            thisAux.service.findById(this.modalCrudData.id).subscribe(
                                () => this.checkControlbarFixed()
                            );
                        } else if (this.modalCrudData.entity) {
                            this.service.setEntity(this.modalCrudData.entity);
                        }
                    }

                    this.checkControlbarFixed();
                });
            });

        this.scrollSubscription = this.onMoveScrool()
            .subscribe(() => this.checkControlbarFixed());
    }

    checkControlbarFixed(): void {
        this.isMarksInViewPort = this.cmark && FlyUtilService.isInViewport(this.cmark.nativeElement);

        this.controlbarState = this.isMarksInViewPort ? 'normal' : 'fixed';
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this.checkControlbarFixed();
    }

    ngOnDestroy(): void {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }

        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
    }

    isDisabledButtons(): boolean {
        if (!this.service) {
            return false;
        }

        return this.service.isSearching ||
            this.service.isSaving ||
            this.service.isRemoving;
    }
}
