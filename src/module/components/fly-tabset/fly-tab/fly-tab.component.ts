import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fly-tab',
    templateUrl: './fly-tab.component.html',
    styleUrls: ['./fly-tab.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlyTabComponent implements OnInit {
    @Input() lazy: boolean;
    @Input() required: boolean;
    @Input() heading: string;
    @Input() iconClass: string;
    @Input() disabled: boolean;

    constructor() {
    }

    private _active: boolean;

    public get active() {
        return this._active;
    }

    public set active(active) {
        this._active = active;
    }

    ngOnInit() {
    }
}
