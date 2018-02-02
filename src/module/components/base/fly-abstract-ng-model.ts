import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef, Input } from '@angular/core';

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
    @Input() disabled = false;
    private _value: T;

    // Function to call when the rating changes.
    onChange(value: T): void {
    }

    // Function to call when the input is touched (when a star is clicked).
    onTouched(): void {
    }

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
        this.onChange(value);
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
