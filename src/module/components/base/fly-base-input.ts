import { EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FlyAbstractNgModel } from './fly-abstract-ng-model';
import { FlyUtilService } from '../../services/fly-util.service';

export abstract class FlyBaseInput extends FlyAbstractNgModel<any> implements OnInit {
    public hasFocus: boolean;

    @Input() name;

    @Output() focus: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() blur: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() keyup: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() keydown: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() change: EventEmitter<Object> = new EventEmitter<Object>();

    constructor(private _flyUtilService: FlyUtilService) {
        super();
    }

    ngOnInit() {
        if (!this.name) {
            FlyUtilService.fieldRequired('name');
        }
    }

    _blur($event: any) {
        this.hasFocus = false;
        this.blur.next($event);
    }

    _focus($event: any) {
        this.hasFocus = true;
        this.focus.next($event);
    }

    _keyup($event: any) {
        /*this.keyup.next($event);*/
    }

    _keydown($event: any) {
        /*this.keydown.next($event);*/
    }

    public _change($event: any) {
        /*this.change.next($event);*/
    }

    _input($event: any) {
        //console.log($event.target);
    }
}
