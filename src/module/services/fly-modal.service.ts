import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { FlyService } from './fly.service';

@Injectable()
export class FlyModalService {

    constructor(private dialog: MatDialog) {
    }

    public open(modalComponent: any, data: any, config: object = {}): FlyModalRef {
        config['width'] = config['width'] || '400px';
        config['data'] = data;

        const dialogRef: FlyModalRef = this.dialog.open(modalComponent, config);

        return dialogRef;
    }
}

export interface FlyModalCrudData {
    id: number;
    gridService: FlyService<any, any>;
}

export interface FlyModalRef {
    close(dialogResult?: any): void;

    /**
     * Gets an observable that is notified when the dialog is finished opening.
     */
    afterOpen(): Observable<void>;

    /**
     * Gets an observable that is notified when the dialog is finished closing.
     */
    afterClosed(): Observable<any | undefined>;

    /**
     * Gets an observable that is notified when the dialog has started closing.
     */
    beforeClose(): Observable<any | undefined>;
}
