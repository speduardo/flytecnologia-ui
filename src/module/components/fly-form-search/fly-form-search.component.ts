import { AfterViewInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FlyFormService } from '../service/fly-form.service';

@Component({
    selector: 'fly-form-search',
    templateUrl: './fly-form-search.component.html',
    styleUrls: ['./fly-form-search.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FlyFormSearchComponent extends FlyFormService implements OnInit, AfterViewInit {
    @Input() header: string;

    constructor() {
        super();
    }

    ngOnInit() {
        this.service.showProgressbarGrid = false;
        this.service.isFormSearch = true;

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
