import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'fly-button-icon',
    templateUrl: './fly-button-icon.component.html',
    styleUrls: ['./fly-button-icon.component.scss']
})
export class FlyButtonIconComponent implements OnInit {

    @Input() src: any;
    @Input() label: string;

    constructor() {
    }

    ngOnInit() {
    }

}
