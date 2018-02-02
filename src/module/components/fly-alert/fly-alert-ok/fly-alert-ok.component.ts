import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'fly-alert-ok',
    templateUrl: './fly-alert-ok.component.html',
    styleUrls: ['./fly-alert-ok.component.scss']
})
export class FlyAlertOkComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<FlyAlertOkComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

    close(): void {
        this.dialogRef.close();
    }
}
