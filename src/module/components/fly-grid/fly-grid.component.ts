import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { MatDialog } from '@angular/material';

import * as _ from 'lodash';

import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

import { FlyService } from '../../services/fly.service';

@Component({
    selector: 'fly-grid',
    templateUrl: './fly-grid.component.html',
    styleUrls: ['./fly-grid.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('row', [
            state('ready', style({opacity: 1})),
            transition('void => ready', animate('300ms 0s ease-in', keyframes([
                style({opacity: 0, transform: 'translateX(-30px)', offset: 0}),
                style({opacity: 0.8, transform: 'translateX(10px)', offset: 0.8}),
                style({opacity: 1, transform: 'translateX(0px)', offset: 1})
            ]))),
            transition('ready => void', animate('300ms 0s ease-out', keyframes([
                style({opacity: 1, transform: 'translateX(0px)', offset: 0}),
                style({opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2}),
                style({opacity: 0, transform: 'translateX(30px)', offset: 1})
            ])))
        ])
    ]
})
export class FlyGridComponent implements OnInit, AfterViewInit {
    smallnumPages = 0;
    selectionMode = 'single';
    rowState = 'ready';

    @Input() service: FlyService<any, any>;
    @Input() masterService: FlyService<any, any>;

    @Input() multiSelect = false;

    @Input() header: string;

    @Input() searchOnStart = false;

    @Input() showEditButton = false;
    @Input() showAddButton = false;
    @Input() showRemoveButton = false;
    @Input() showPagination = false;
    @Input() showFooter = false;

    // @Input() watch = [];
    // @Input() watchNonRequired = [];

    @Input() gridHeight = '250px';
    @Input() labelAddButton = 'ADICIONAR';
    @Input() msgAnyRecord = 'Nenhum registro';

    @ViewChild('flyGridElement') flyGridElement: ElementRef;

    @ViewChild('flyGridHeaderTemplate')
    flyGridHeaderTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellTemplate')
    flyGridCellTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellButtonTemplate')
    flyGridCellButtonTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellDateTemplate')
    flyGridCellDateTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellCnpjTemplate')
    flyGridCellCnpjTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellCpfTemplate')
    flyGridCellCpfTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellCepTemplate')
    flyGridCellCepTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellTimeTemplate')
    flyGridCellTimeTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellPhoneBrTemplate')
    flyGridCellPhoneBrTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellEnumTemplate')
    flyGridCellEnumTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellYesNoTemplate')
    flyGridCellYesNoTemplate: TemplateRef<any>;

    private isAddedEditColumn = false;

    constructor(private dialog: MatDialog) {

        if (this.multiSelect === true) {
            this.selectionMode = 'multiple';
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.configGridService();
            this.addDefaultColumns();
            this.onSearchOnStart();
        }, 100);
    }

    afterPushColumn(column: any, gridInstance: any) {
        if (column.type && !column.cellTemplate) {
            if (column.type === 'date') {
                column.cellTemplate = gridInstance.flyGridCellDateTemplate;
            } else if (column.type === 'cnpj') {
                column.cellTemplate = gridInstance.flyGridCellCnpjTemplate;
            } else if (column.type === 'cpf') {
                column.cellTemplate = gridInstance.flyGridCellCpfTemplate;
            } else if (column.type === 'cep') {
                column.cellTemplate = gridInstance.flyGridCellCepTemplate;
            } else if (column.type === 'time') {
                column.cellTemplate = gridInstance.flyGridCellTimeTemplate;
            } else if (column.type === 'flyPhoneBr') {
                column.cellTemplate = gridInstance.flyGridCellPhoneBrTemplate;
            } else if (column.type === 'enum') {
                column.cellTemplate = gridInstance.flyGridCellEnumTemplate;
            } else if (column.type === 'yesNo') {
                column.cellTemplate = gridInstance.flyGridCellYesNoTemplate;
            }
        }
    }

    onSearchOnStart() {
        if (this.searchOnStart) {
            this.search();
        }
    }

    configGridService() {
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
        if (this.service.isFormSearch && this.service.isPopup) {
            this.addSelectButtonColumn();
        }

        if (this.showEditButton && !(this.service.isFormSearch && this.service.isPopup)) {
            this.addEditButtonColumn();
        }

        if (this.showRemoveButton) {
            this.addRemoveButtonColumn();
        }

        this.service.columns = this.service.columnsAux;
    }

    addSelectButtonColumn() {
        this.service.addColumn({
            field: 'id',
            header: '',
            sortable: false,
            style: {'width': '55px'},
            isButton: true,
            iconButtonClass: 'fa-arrow-down',
            buttonClass: 'btn-primary',
            cellTemplate: this.flyGridCellButtonTemplate,
            click: this.onSelectToAutocomplete
        }, 0);
    }

    addEditButtonColumn() {
        this.service.addColumn({
            field: 'id',
            header: '',
            sortable: false,
            style: {'width': '55px'},
            isButton: true,
            iconButtonClass: 'fa-edit',
            buttonClass: 'btn-primary',
            cellTemplate: this.flyGridCellButtonTemplate,
            click: this.onEdit
        });

        this.isAddedEditColumn = true;
    }

    addRemoveButtonColumn() {
        this.service.addColumn({
            field: 'id',
            header: '',
            sortable: false,
            style: {'width': '55px'},
            isButton: true,
            iconButtonClass: 'fa-trash',
            buttonClass: 'btn-danger',
            cellTemplate: this.flyGridCellButtonTemplate,
            click: this.$gridRemove
        });
    }

    dblclickItem(service, data): void {
        if (!this.onSelectToAutocomplete(service, data)) {
            this.onEditRecord(service, data);
        }
    }

    onEditRecord(service, data): void {
        if (this.isAddedEditColumn) {
            this.onEdit(service, data);
        }
    }

    onSelectToAutocomplete(service, data): boolean {
        return service.$gridSelectToAutocomplete(data);
    }

    onEdit(service, data): void {
        service.$gridEdit(data);
    }

    $gridRemove(service, data): void {
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

    getNestedValue(obj: any, property: string): string {
        return _.get(obj, property);
    }

    getEnumValue(obj: any, col: any): string {
        const value = this.getNestedValue(obj, col.field);

        if (!value || !col.provider) {
            return value;
        }

        const provider = col.provider;
        const fieldValue = col.fieldValue || 'value';
        const fieldProperty = 'property';

        const fieldDescription = col.fieldDescription || 'description';

        let description = '';

        provider.forEach((item) => {
            if (item[fieldValue] === value || (item[fieldValue] == null && item[fieldProperty] === value)) {
                description = item[fieldDescription];
            }
        });

        return description;
    }

    getValueYesNo(value): string {
        if (value === 'S' || value === 's' || value === true || value === 'true' || value === '1' || value === 1) {
            return 'Sim';
        }

        return 'Não';
    }

    customSort($event): void {
        const a = $event;

        if ($event.order && $event.field &&
            !(this.service.filter.sortGridByField === $event.field &&
                this.service.filter.typeSortGridByField === ($event.order === 1 ? 'a' : 'd'))) {
            this.service.filter.sortGridByField = $event.field;
            this.service.filter.typeSortGridByField = $event.order === 1 ? 'a' : 'd';

            this.search();
        }
    }
}
