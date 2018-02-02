import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { FlyService } from '../../services/fly.service';

@Component({
    selector: 'fly-grid',
    templateUrl: './fly-grid.component.html',
    styleUrls: ['./fly-grid.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FlyGridComponent implements OnInit {
    smallnumPages = 0;

    @Input() service: FlyService<any, any>;

    @Input() selectionMode = 'single';

    @Input() header: string;

    @Input() searchOnStart = false;

    @Input() showEditButton = false;
    @Input() showRemoveButton = false;

    @ViewChild('flyGridElement') flyGridElement: ElementRef;

    constructor() {
    }

    ngOnInit() {
        this.configServiceGrid();
        this.addDefaultColumns();
        this.onSearchOnStart();
    }

    onSearchOnStart() {
        if (this.searchOnStart) {
            this.search();
        }
    }

    configServiceGrid() {
        this.service.gridScope = this;
        this.service.flyGridElement = this.flyGridElement;
        /*This must be the last method*/
        this.service.onConfigGrid(this.service);
    }

    addDefaultColumns() {
        if (this.showEditButton) {
            this.addEditButtonColumn();
        }

        if (this.showRemoveButton) {
            this.addRemoveButtonColumn();
        }

        this.service.columns = this.service.columnsAux;
    }

    addEditButtonColumn() {
        this.service.addColumn({
            field: 'id',
            header: '',
            sortable: false,
            style: {'width': '55px'},
            isButton: true,
            click: this.onEdit
        });
    }

    onEdit(service, data) {
        if (!!data && data.id) {
            service.editRecord(Number(data.id));
        }
    }

    addRemoveButtonColumn() {

    }

    search(): void {
        this.service.search(this.service.getFilter()).subscribe();
    }

    clean(): void {
        this.service.clean();
    }

    pageChanged(event: any): void {
        /* console.log('Page changed to: ' + event.page);
         console.log('Number items per page: ' + event.itemsPerPage);*/
    }


}
