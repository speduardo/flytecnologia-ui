import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';

import { FlyService } from '../../services/fly.service';
import { FlyModalService } from '../../services/fly-modal.service';

@Component({
    selector: 'fly-grid',
    templateUrl: './fly-grid.component.html',
    styleUrls: ['./fly-grid.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FlyGridComponent implements OnInit {
    smallnumPages = 0;

    @Input() service: FlyService<any, any>;
    @Input() masterService: FlyService<any, any>;

    @Input() selectionMode = 'single';

    @Input() header: string;

    @Input() searchOnStart = false;

    @Input() showEditButton = false;
    @Input() showAddButton = false;
    @Input() showRemoveButton = false;

    @Input() watch = [];
    @Input() watchNonRequired = [];

    @Input() gridHeight = '300px';
    @Input() labelAddButton = 'ADICIONAR';
    @Input() msgAnyRecord = 'Nenhum registro';

    @ViewChild('flyGridElement') flyGridElement: ElementRef;

    @ViewChild('flyGridHeaderTemplate')
    public flyGridHeaderTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellTemplate')
    public flyGridCellTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellEditButtonTemplate')
    public flyGridCellEditButtonTemplate: TemplateRef<any>;

    @ViewChild('flyGridCellRemoveButtonTemplate')
    public flyGridCellRemoveButtonTemplate: TemplateRef<any>;

    constructor(public modalService: FlyModalService,
                private dialog: MatDialog) {
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
        this.service.masterService = this.masterService;
        this.service.matDialogService = this.dialog;
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
            click: this.onRemove
        });
    }

    onEdit(service, data) {
        if (!!data && data.id) {

            if (service.masterService) {
                service.openPopupCrudForm(data.id);
            } else {
                service.editRecord(Number(data.id));
            }
        }
    }

    onRemove(service, data) {
        if (!!data && data.id) {
            service.remove(Number(data.id)).subscribe(
                () => service.search().subscribe()
            );
        }
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

    /*
    openCrudForm(id: number = null): void {
        const data: FlyModalCrudData = {
            id: id,
            gridService: this.service
        };

        const dialogRef: FlyModalRef = this.dialog.open(this.service.crudFormComponent, {
                width: '800px',
                data: data
            })
        ;

        const dialogRef: FlyModalRef = this.modalService.open(this.service.crudFormComponent, {
            id: id,
            gridService: this.service
        });

        dialogRef
            .afterClosed()

            .subscribe(
                (result) => {
                    this.onClosePopup();

                    return result;
                }
            )
        ;

        this.service.modalCrudRef = dialogRef;
    }*/

    closeModal(): void {
        this.service.closeModal();
    }

    onClosePopup(): void {
    }

}
