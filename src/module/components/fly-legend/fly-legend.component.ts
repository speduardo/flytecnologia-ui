import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fly-legend',
    templateUrl: './fly-legend.component.html',
    styleUrls: ['./fly-legend.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlyLegendComponent implements OnInit {

    @Input() heading: string;
    @Input() iconClass: string;

    constructor() {
    }

    ngOnInit() {
    }
}
