import { AfterViewInit, Component, Inject, Input, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { FlyFormService } from '../service/fly-form.service';
import { FlyModalSearchData } from '../../services/fly-modal.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'fly-form-search',
    templateUrl: './fly-form-search.component.html',
    styleUrls: ['./fly-form-search.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FlyFormSearchComponent extends FlyFormService implements OnInit, AfterViewInit {
    constructor(@Optional() @Inject(MAT_DIALOG_DATA) public modalSearchData: FlyModalSearchData) {
        super();
    }

    ngOnInit() {
        this.service.showProgressbarGrid = false;
        this.service.isFormSearch = true;

        this.service.masterService = this.modalSearchData ? this.modalSearchData.autocompleteService : null;
        this.service.isPopup = !!this.service.masterService;

        if (this.service.isPopup) {
            this.service.modalSearchRef = this.service.masterService.modalSearchRef;
            this.service.isPopupCrudDetail = this.service.masterService.masterService &&
                this.service.masterService.masterService.isPopupCrudDetail;
        }

        this.service.loadDefaultValuesSearch().subscribe(
            () => {
                this.isDefaultValuesAvalilable = true;

                setTimeout(() => {
                    this.service.form = this.flyForm;
                    this.service.onInitForm();
                });
            });
    }

    search(): void {
        this.service.search(this.service.getFilter()).subscribe();
    }

    clean(): void {
        this.service.clean();

        this.search();
    }

}
