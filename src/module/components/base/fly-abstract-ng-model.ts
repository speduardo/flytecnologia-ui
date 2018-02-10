import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventEmitter, forwardRef, Input, Output } from '@angular/core';

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

    @Input() disabled = false;
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
        value = this.checkValue(value);
        this._value = value;
        this.onSetValue();
        this.onChange(value);
    }

    public onSetValue(): void {

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
