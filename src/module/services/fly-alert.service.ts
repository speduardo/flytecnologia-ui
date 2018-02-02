import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FlyAlertOkComponent } from '../components/fly-alert/fly-alert-ok/fly-alert-ok.component';
import { FlyAlertYesNoComponent } from '../components/fly-alert/fly-alert-yes-no/fly-alert-yes-no.component';

@Injectable()
export class FlyAlertService {


    constructor(private toastr: ToastrService,
                public dialog: MatDialog) {
    }

    showOk(message: string, title: string = 'Tudo certo!'): Observable<void> {
        return new Observable(observer => {
            let dialogRef: MatDialogRef<FlyAlertOkComponent>;

            dialogRef = this.dialog.open(FlyAlertOkComponent, {
                width: '400px',
                data: {message: message, title: title},
                hasBackdrop: true
            });

            dialogRef.afterClosed().subscribe(() => {
                observer.next();
                observer.complete();
            });

            dialogRef.backdropClick().subscribe(() => {
                observer.next();
                observer.complete();
            });
        });
    }

    confirm(message: string, title: string = 'Confirma?'): Observable<any> {
        return new Observable(observer => {
            let dialogRef: MatDialogRef<FlyAlertYesNoComponent>;

            dialogRef = this.dialog.open(FlyAlertYesNoComponent, {
                width: '400px',
                data: {message: message, title: title},
                hasBackdrop: true
            });

            dialogRef.afterClosed().subscribe((result) => {
                observer.next(result);
                observer.complete();
            });
        });
    }

    error(message: string, title: string = 'Erro'): FlyAlert {
        return this.toastr.error(message, title);
    }

    success(message: string, title: string = 'Tudo certo'): FlyAlert {
        return this.toastr.success(message, title);
    }

    info(message: string, title: string = 'Observe'): FlyAlert {
        return this.toastr.info(message, title);
    }

    warning(message: string, title: string = 'Atenção'): FlyAlert {
        return this.toastr.warning(message, title);
    }
}

export interface FlyAlert {
    onShown: Observable<any>;
    /** triggered when toast is destroyed */
    onHidden: Observable<any>;
    /** triggered on toast click */
    onTap: Observable<any>;
    /** available for your use in custom toast */
    onAction: Observable<any>;
}
