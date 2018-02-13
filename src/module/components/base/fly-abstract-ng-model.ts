import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FlyNgModelExtra } from '../interface/fly-ng-model-extra';

/*
+------------------------------------+----------------------+
|              Accessor              |     Form Element     |
+------------------------------------+----------------------+
| DefaultValueAccessor               | input, textarea      |
| CheckboxControlValueAccessor       | input[type=checkbox] |
| NumberValueAccessor                | input[type=number]   |
| RadioControlValueAccessor          | input[type=radio]    |
| RangeValueAccessor                 | input[type=range]    |
| SelectControlValueAccessor         | select               |
| SelectMultipleControlValueAccessor | select[multiple]     |
*/
export abstract class FlyAbstractNgModel<T> implements ControlValueAccessor {
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);
    @Input() ngModelExtra: Array<FlyNgModelExtra> = [];
    @Input() ngModelClean: Array<FlyNgModelExtra> = [];
    @Input() disabled = false;
    @Input() clearWhenDisable: boolean;

    public ignoreEqualValue = true;

    private _value: T;

    // Function to call when the rating changes.
    onChange(value: T): void {
    }

    // Function to call when the input is touched (when a star is clicked).
    onTouched(): void {
    }

    public get value(): T {
        return this._value;
    }

    public set value(value: T) {
        const oldValue = this._value;

        if (this.ignoreEqualValue && oldValue === value) {
            return;
        }

        value = this.checkValue(value);
        this._value = value;
        this.onSetValue(value);
        this.onChange(value);
        this.setNgModelExtra(value);
        this.setNgModelClean(value);
    }

    public setNgModelExtra(value) {
        if (this.ngModelExtra.length) {
            this.ngModelExtra.forEach((item: FlyNgModelExtra) => {
                item.o[item.p] = value;
            });
        }
    }


    public setNgModelClean(value) {
        if (value) {
            return;
        }

        if (this.ngModelClean.length) {
            this.ngModelClean.forEach((item: FlyNgModelExtra) => {
                item.o[item.p] = null;
            });
        }
    }

    public onSetValue(value: T): void {

    }

    public checkValue(value: T): T {
        return value;
    }

    writeValue(value: T): void {
        this.value = value;
        /* warning: comment below if only want to emit on user intervention
        this.onChange(value);*/
    }

    registerOnChange(fn: (value: T) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;

        if (disabled && this.clearWhenDisable) {
            this.value = null;
        }
    }
}

export function ngModelProvider(type: any): any {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}

export function ngModelValidationProvider(type: any): any {
    return {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => type),
        multi: true
    };
}
