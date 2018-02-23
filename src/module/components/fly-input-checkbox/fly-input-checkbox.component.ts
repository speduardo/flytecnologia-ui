import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FlyAbstractNgModel, ngModelProvider } from '../base/fly-abstract-ng-model';
import { NgModel } from '@angular/forms';

let nextUniqueId = 0;

@Component({
    selector: 'fly-input-checkbox',
    templateUrl: './fly-input-checkbox.component.html',
    styleUrls: ['./fly-input-checkbox.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        ngModelProvider(FlyInputCheckboxComponent)
    ]
})
export class FlyInputCheckboxComponent extends FlyAbstractNgModel<boolean> implements OnInit {
    @Input() label: string;
    @Input() id = `fly-checkbox-${nextUniqueId++}`;
    @Input() disabled = false;
    @Input() alignInRow = true;

    @Output() change: EventEmitter<Object> = new EventEmitter<Object>();

    @ViewChild('inputField') inputField: NgModel;

    constructor() {
        super();
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }


    ngOnInit() {
    }

    cbOnChange($event): void {
        if ($event) {
            this.change.next($event.checked);
        }
    }
}
