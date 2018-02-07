import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';

import { FlyService } from '../../services/fly.service';

@Component({
    selector: 'fly-grid',
    templateUrl: './fly-grid.component.html',
    styleUrls: ['./fly-grid.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FlyGridComponent implements OnInit {
    smallnumPages = 0;
    selectionMode = 'single';

    @Input() service: FlyService<any, any>;
    @Input() masterService: FlyService<any, any>;

    @Input() multiSelect = false;

    @Input() header: string;

    @Input() searchOnStart = false;

    @Input() showEditButton = false;
    @Input() showAddButton = false;
    @Input() showRemoveButton = false;
    @Input() showPagination = false;

    @Input() watch = [];
    @Input() watchNonRequired = [];

    @Input() gridHeight = '250px';
    @Input() labelAddButton = 'ADICIONAR';
    @Input() msgAnyRecord = 'Nenhum registro';

    @ViewChild('flyGridElement') flyGridElement: ElementRef;

    @ViewChild('flyGridHeaderTemplate')
    flyGridHeaderTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellTemplate')
    flyGridCellTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellEditButtonTemplate')
    flyGridCellEditButtonTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellRemoveButtonTemplate')
    flyGridCellRemoveButtonTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellDateTemplate')
    flyGridCellDateTemplate: TemplateRef<any>;

    constructor(private dialog: MatDialog) {

        if (this.multiSelect === true) {
            this.selectionMode = 'multiple';
        }
    }

    ngOnInit() {
        this.configServiceGrid();
        this.addDefaultColumns();
        this.onSearchOnStart();
    }

    afterPushColumn(column: any, gridInstance: any) {
        if (column.type && !column.cellTemplate) {
            if (column.type === 'date') {
                column.cellTemplate = gridInstance.flyGridCellDateTemplate;
            }
        }
    }

    onSearchOnStart() {
        if (this.searchOnStart) {
            this.search();
        }
    }

    configServiceGrid() {
        if (this.masterService) {
            /*all crud grids*/
            this.masterService.listNameEntityMasterPropertyList.push(this.service.entityMasterPropertyList);
            this.service.masterService = this.masterService;
            this.masterService.cleanEvent.subscribe(
                () => this.clean()
            );
        }
        this.service.showAllRecordsOnSearch = this.showPagination === false;
        this.service.matDialogService = this.dialog;
        this.service.gridScope = this;
        this.service.flyGridElement = this.flyGridElement;
        this.service._afterPushColumn = (column) => this.afterPushColumn(column, this);
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
            cellTemplate: this.flyGridCellEditButtonTemplate,
            click: this.onEdit
        });
    }

    addRemoveButtonColumn() {
        this.service.addColumn({
            field: 'id',
            header: '',
            sortable: false,
            style: {'width': '55px'},
            isButton: true,
            cellTemplate: this.flyGridCellRemoveButtonTemplate,
            click: this.$gridRemove
        });
    }

    onEdit(service, data) {
        service.$gridEdit(data);
    }

    $gridRemove(service, data) {
        service.$gridRemove(data);
    }

    search(): void {
        this.service.search().subscribe();
    }

    clean(): void {
        this.service.clean();
    }

    pageChanged(event: any): void {
    }
}
