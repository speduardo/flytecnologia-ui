import {
    AfterViewInit,
    Component,
    ContentChildren,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FlyAlertService } from '../../services/fly-alert.service';
import { FlyFormService } from '../service/fly-form.service';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'fly-form-crud',
    templateUrl: './fly-form-crud.component.html',
    styleUrls: ['./fly-form-crud.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FlyFormCrudComponent extends FlyFormService implements OnInit, OnDestroy, AfterViewInit {
    idSubscription: Subscription;

    @Input() header: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private alertService: FlyAlertService) {
        super();
    }

    ngOnInit() {
        const thisAux = this;

        this.idSubscription = this.route.params.subscribe(params => {
            if (params['id']) {
                thisAux.service.findById(Number(params['id'])).subscribe();
            }
        });

        this.service.isFormCrud = true;
        this.service.loadDefaultValuesCrud().subscribe(
            () => {
                this.isDefaultValuesAvalilable = true;

                setTimeout(() => {
                    this.service.form = this.flyForm;

                });
            });
    }

    ngOnDestroy() {
        this.idSubscription.unsubscribe();
    }

    save(): void {
        this.service.save(true, true).subscribe();
    }

    remove(): void {
        this.service.remove(this.service.entity.id).subscribe(() => {
            this.alertService.success('Registro excluido com sucesso!');
            this.service.goToNew();
        });
    }

    isDisabledButtons(): boolean {
        if (!this.service) {
            return false;
        }

        return this.service.isSearching || this.service.isSaving || this.service.isRemoving;
    }
}
