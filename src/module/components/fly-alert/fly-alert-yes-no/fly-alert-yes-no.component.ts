import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'fly-alert-yes-no',
    templateUrl: './fly-alert-yes-no.component.html',
    styleUrls: ['./fly-alert-yes-no.component.scss']
})
export class FlyAlertYesNoComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<FlyAlertYesNoComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

    onCloseConfirm() {
        this.dialogRef.close('YES');
    }

    onCloseCancel() {
        this.dialogRef.close('NO');
    }
}
