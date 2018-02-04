import { NgForm } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import './../confg/rxjs-operators.config';

import { FlyHttpClient } from '../security/fly-http-client';
import { FlyConfigService } from '../confg/fly-config.service';
import { FlyEntity } from './entity/fly-entity';
import { FlyFilter } from './filter/fly-filter';
import { FlyGridComponent } from '../components/fly-grid/fly-grid.component';
import { FlyAlertService } from './fly-alert.service';
import { FlyModalCrudData, FlyModalRef } from './fly-modal.service';

export abstract class FlyService<T extends FlyEntity, F extends FlyFilter> {
    controller: string;
    filter: F;
    entity: T;
    parameters: any = {};
    itemsPerPage = 10;
    totalElements = 0;
    totalPages = 0;
    numberOfElements = 0;
    provider = [];
    columns = [];
    columnsAux = [];
    gridScope: FlyGridComponent;
    flyGridElement: ElementRef;
    isSearching = false;
    isSaving = false;
    isRemoving = false;
    isPrinting = false;
    isPopup = false;
    showProgressbarGrid = true;
    urlRouter: string;
    isFormSearch = false;
    isFormCrud = false;
    isDefaultValuesLoaded = false;
    defaultValues = {};
    itemsAutocomplete = [];
    methodNameDefaultValuesCrud = 'defaultValuesCrud';
    methodNameDefaultValuesSearch = 'defaultValuesSearch';
    methodNameAutocomplete = 'autocomplete';

    crudFormComponent: any;

    gridMasterService: FlyService<any, any>;
    masterService: FlyService<any, any>;
    modalCrudRef: FlyModalRef;
    matDialogService: MatDialog;
    form: NgForm;

    constructor(protected http: FlyHttpClient,
                protected config: FlyConfigService,
                protected router: Router) {
    }

    getUrlBase(): string {
        return this.config.apiUrl + '/' + this.controller;
    }

    getFilter(): F {
        return this.filter;
    }

    beforeSave(): boolean {
        return true;
    }

    onInitForm(): void {

    }

    afterSave(): void {
    }

    findResult(): void {
    }

    create(): Observable<FlyEntity> {
        return new Observable(observer => {
            this.isSaving = true;

            if (this.beforeSave() === false) {
                this.isSaving = false;

                observer.error();
                observer.complete();
            } else {
                const entity = {
                    entity: this.entity,
                    parameters: this.parameters
                };

                this.http.post(this.getUrlBase(), entity)
                    .subscribe((data) => {
                        this.isSaving = false;
                        this.afterSave();
                        observer.next(data);
                        observer.complete();

                    }, reject => {
                        this.isSaving = false;

                        observer.error(reject);
                        observer.complete();
                    });
            }
        });
    }

    update(): Observable<FlyEntity> {
        return new Observable(observer => {
            this.isSaving = true;

            if (this.beforeSave() === false) {
                this.isSaving = false;

                observer.error();
                observer.complete();
            } else {
                const entity = {
                    entity: this.entity,
                    parameters: this.parameters
                };

                this.http.put(`${this.getUrlBase()}/${this.entity.id}`, entity)
                    .subscribe((data) => {
                        this.isSaving = false;
                        this.entity = data;
                        this.findResult();
                        this.afterSave();
                        observer.next(data);
                        observer.complete();

                    }, reject => {
                        this.isSaving = false;

                        observer.error(reject);
                        observer.complete();
                    });
            }
        });
    }

    save(showMessage: boolean = false, goToEditPage: boolean = false): Observable<FlyEntity> {
        return new Observable(observer => {
            if (this.entity.id) {
                this.update().subscribe(
                    (response) => {
                        if (showMessage) {
                            this.getAlertService().success('Registro atualizado com sucesso!');
                        }

                        observer.next(response);
                        observer.complete();
                    }, reject => {
                        observer.error(reject);
                        observer.complete();
                    }
                );
            } else {
                this.create()
                    .subscribe(
                        (response) => {

                            if (showMessage) {
                                this.getAlertService().success('Registro criado com sucesso!');
                            }

                            if (goToEditPage) {
                                this.goToEdit(response.id);
                            }

                            observer.next(response);
                            observer.complete();
                        }, reject => {
                            observer.error(reject);
                            observer.complete();
                        }
                    );
            }
        });
    }

    remove(id: number = this.entity.id): Observable<any> {
        const self = this;

        return new Observable(observer => {
            this.getAlertService().confirm('Tem certeza que deseja excluir?', 'Atenção')
                .subscribe(
                    (result) => {
                        if (result === 'YES') {
                            self.isRemoving = true;

                            this.http.delete(`${this.getUrlBase()}/${id}`)
                                .subscribe((data) => {
                                    self.isRemoving = false;
                                    this.cleanEntity();

                                    observer.next(data);
                                    observer.complete();

                                }, reject => {
                                    self.isRemoving = false;

                                    observer.error(reject);
                                    observer.complete();
                                });
                        } else {
                            self.isRemoving = false;

                            observer.complete();
                        }
                    }
                );
        });
    }

    findById(id: number = this.entity.id): Observable<FlyEntity> {
        return new Observable(observer => {
            this.isSearching = true;

            this.http.get(`${this.getUrlBase()}/${id}`)
                .subscribe((data) => {
                    this.isSearching = false;
                    this.entity = data;

                    this.findResult();

                    observer.next(data);
                    observer.complete();
                }, (error) => {
                    this.isSearching = false;

                    observer.error(error);
                    observer.complete();
                });
        });
    }

    loadDefaultValuesCrud(): Observable<any> {
        return this.loadDefaultValues(this.methodNameDefaultValuesCrud);
    }

    loadDefaultValuesSearch(): Observable<any> {
        return this.loadDefaultValues(this.methodNameDefaultValuesSearch);
    }

    private loadDefaultValues(methodName): Observable<any> {
        return new Observable(observer => {
            this.http.get(`${this.getUrlBase()}/${methodName}`)
                .subscribe((data) => {
                    this.defaultValues = data;
                    this.isDefaultValuesLoaded = false;
                    observer.next(data);
                    observer.complete();
                }, (error) => {
                    observer.error(error);
                    observer.complete();
                });
        });
    }

    autocomplete(entity: T): Observable<any> {
        return new Observable(observer => {
            this.isSearching = true;

            this.http.get(`${this.getUrlBase()}/${this.methodNameAutocomplete}`)
                .debounceTime(400)
                .distinctUntilChanged()
                .subscribe((data) => {
                    this.isSearching = false;
                    this.itemsAutocomplete = data;

                    observer.next(data);
                    observer.complete();
                }, (error) => {
                    this.itemsAutocomplete = [];
                    this.isSearching = false;

                    observer.error(error);
                    observer.complete();
                });
        });
    }

    clean(): void {
        this.cleanEntity();
        this.cleanFilter();
        this.resetForm();

        if (this.isFormCrud) {
            this.goToNew();
        } else {
            this.onInitForm();
        }
    }

    resetForm(): void {
        if (!this.form) {
            return;
        }

        this.form.reset();
        this.form.resetForm();
        this.form.form.reset();
    }

    cleanEntity(): void {
        if (!this.entity) {
            return;
        }

        const props = Object.getOwnPropertyNames(this.entity);

        const self = this;

        props.forEach(function (prop) {
            self.entity[prop] = null;
        });
    }

    cleanFilter(): void {
        if (!this.filter) {
            return;
        }

        const props = Object.getOwnPropertyNames(this.filter);

        const self = this;

        props.forEach(function (prop) {
            self.filter[prop] = '';
        });

        this.filter.size = this.itemsPerPage;
    }

    searchAll(filter: FlyFilter = this.getFilter()): Observable<any[]> {
        filter.page = 99999999;

        return this.search(filter);
    }

    search(filter: FlyFilter = this.getFilter()): Observable<any[]> {
        filter.size = this.itemsPerPage;

        let params = new HttpParams();

        const props = Object.getOwnPropertyNames(filter);

        const page = filter.page !== -1 ? (filter.page > 0 ? (filter.page - 1) : 0) : -1;

        props.forEach(function (prop) {
            if (prop === 'page') {
                params = params.set(prop, !!page ? page.toString() : '');
            } else {
                params = params.set(prop, !!filter[prop] ? filter[prop].toString() : '');
            }
        });

        return new Observable(observer => {
            this.isSearching = true;

            this.http.get(`${this.getUrlBase()}`, {params: params})
                .subscribe((data) => {
                    this.definePaginationValues(data);
                    this.isSearching = false;

                    observer.next(data);
                    observer.complete();

                }, reject => {
                    this.isSearching = false;

                    observer.error(reject);
                    observer.complete();
                });
        });
    }

    definePaginationValues(response): void {
        this.provider = response.result;
        this.totalElements = response.totalElements;
        this.filter.page = response.pageNumber + 1;
        this.filter.size = response.pageSize;
        this.numberOfElements = response.numberOfElements;

        let totalPages = Math.trunc(this.totalElements / this.filter.size);

        if (this.totalElements % this.filter.size > 0) {
            totalPages += 1;
        }

        this.totalPages = totalPages;
    }

    goToSearch(): Promise<boolean> {
        return this.router.navigate([
            this.config.appService.appModule + '/' + this.urlRouter
        ]);
    }

    goToNew(): Promise<boolean> {
        return this.router.navigate([
            this.config.appService.appModule + '/' + this.urlRouter + '/new'
        ]);
    }

    goToEdit(id: number): Promise<boolean> {
        return this.router.navigate([
            this.config.appService.appModule + '/' + this.urlRouter,
            id
        ]);
    }

    getAlertService(): FlyAlertService {
        return this.config.alertService;
    }

    /*start grid methods*/

    onConfigGrid(service: any): void {
    }

    editRecord(id: number) {
        this.config.router.navigate([this.config.appService.appModule + '/' + this.urlRouter, id]);
    }

    openPopupCrudForm(id: number = null): void {
        const data: FlyModalCrudData = {
            id: id,
            gridService: this
        };

        const dialogRef: FlyModalRef = this.matDialogService.open(this.crudFormComponent, {
                width: '800px',
                data: data
            })
        ;

        /* const dialogRef: FlyModalRef = this.modalService.open(this.service.crudFormComponent, {
             id: id,
             gridService: this.service
         });*/

        dialogRef.afterClosed().subscribe((result) => {
            return result;
        });

        this.modalCrudRef = dialogRef;
    }

    closeModal(): void {
        if (this.modalCrudRef) {
            this.modalCrudRef.close();
            this.modalCrudRef = null;
        }
    }

    addColumn(column) {
        this.columnsAux.push(column);
    }

    /*start grid methods*/
}
