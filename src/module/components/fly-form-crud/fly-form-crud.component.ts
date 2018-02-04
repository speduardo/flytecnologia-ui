import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, Optional, ViewEncapsulation } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FlyAlertService } from '../../services/fly-alert.service';
import { FlyFormService } from '../service/fly-form.service';
import { FlyModalCrudData } from '../../services/fly-modal.service';

@Component({
    selector: 'fly-form-crud',
    templateUrl: './fly-form-crud.component.html',
    styleUrls: ['./fly-form-crud.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FlyFormCrudComponent extends FlyFormService implements OnInit, OnDestroy, AfterViewInit {
    idSubscription: Subscription;

    labelSaveButton = 'SALVAR';
    labelResetButton = 'LIMPAR';
    labelRemoveButton = 'EXCLUIR';
    labelSaveAndCloseButton = ' E FECHAR';
    labelSaveAndCleanButton = ' E LIMPAR';

    @Input() header: string;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private alertService: FlyAlertService,
                @Optional() @Inject(MAT_DIALOG_DATA) public modalCrudData: FlyModalCrudData) {
        super();
    }

    ngOnInit() {
        const thisAux = this;

        if (!this.modalCrudData) {
            this.idSubscription = this.route.params.subscribe(params => {
                if (params['id']) {
                    thisAux.service.findById(Number(params['id'])).subscribe();
                }
            });
        }

        this.service.isFormCrud = true;

        this.service.gridMasterService = this.modalCrudData ? this.modalCrudData.gridService : null;
        this.service.isPopup = !!this.service.gridMasterService;

        if (this.service.isPopup) {
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
                        thisAux.service.findById(this.modalCrudData.id).subscribe();
                    }
                });
            });
    }

    ngOnDestroy() {
        if (this.idSubscription) {
            this.idSubscription.unsubscribe();
        }
    }

    isDisabledButtons(): boolean {
        if (!this.service) {
            return false;
        }

        return this.service.isSearching || this.service.isSaving || this.service.isRemoving;
    }
}
