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

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FlyAlertService } from '../../services/fly-alert.service';
import { FlyFormService } from '../service/fly-form.service';
import { FlyModalCrudData } from '../../services/fly-modal.service';
import { FlyUtilService } from '../../services/fly-util.service';

@Component({
    selector: 'fly-form-crud',
    templateUrl: './fly-form-crud.component.html',
    styleUrls: ['./fly-form-crud.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FlyFormCrudComponent extends FlyFormService implements OnInit, OnDestroy, AfterViewInit {
    routerSubscription: Subscription;
    scrollSubscription: Subscription;

    @Input() labelSaveButton = 'SALVAR';
    @Input() labelResetButton = 'LIMPAR';
    @Input() labelRemoveButton = 'EXCLUIR';
    @Input() labelSaveAndCloseButton = ' E FECHAR';
    @Input() labelSaveAndCleanButton = ' E LIMPAR';
    @Input() header: string;

    @ViewChild('cmark') cmark: ElementRef;

    isMarksInViewPort = true;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private alertService: FlyAlertService,
                @Optional() @Inject(MAT_DIALOG_DATA) public modalCrudData: FlyModalCrudData) {
        super();
    }

    ngOnInit() {
        const thisAux = this;

        if (!this.modalCrudData) {
            this.routerSubscription = this.route.params.subscribe(params => {
                if (params['id']) {
                    thisAux.service.findById(Number(params['id'])).subscribe();
                }
            });
        }

        this.service.isFormCrud = true;

        this.service.gridMasterService = this.modalCrudData ? this.modalCrudData.gridService : null;
        this.service.isPopup = !!this.service.gridMasterService;
        this.service.isPopupCrudDetail = !!this.service.gridMasterService;

        if (this.service.isPopupCrudDetail) {
            this.service.modalCrudRef = this.service.gridMasterService.modalCrudRef;

            if (!this.service.gridMasterService.masterService.entity.id) {
                this.labelSaveButton = 'ADICIONAR';
            }
        }

        this.service.loadDefaultValuesCrud().subscribe(
            () => {
                this.isDefaultValuesAvalilable = true;

                setTimeout(() => {
                    this.service.form = this.flyForm;
                    this.service.onInitForm();

                    if (this.modalCrudData && this.modalCrudData.id) {
                        thisAux.service.findById(this.modalCrudData.id).subscribe(
                            () => this.checkControlbarFixed()
                        );
                    }

                    this.checkControlbarFixed();
                });
            });

        this.scrollSubscription = this.onMoveScrool()
            .subscribe(() => this.checkControlbarFixed());
    }

    checkControlbarFixed(): void {
        this.isMarksInViewPort = this.cmark && FlyUtilService.isInViewport(this.cmark.nativeElement);
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
