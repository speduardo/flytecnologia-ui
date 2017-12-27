import {ControlValueAccessor} from '@angular/forms';

export abstract class FlyAbstractNgModel implements ControlValueAccessor {
    _value: any = '';

    get value(): any {
        return this._value;
    }

    set value(v: any) {
        this._value = v;
        this.onChange(v);
    }

    writeValue(value: any) {
        this.value = value;
        /* warning: comment below if only want to emit on user intervention
        this.onChange(value);*/
    }

    // Function to call when the rating changes.
    onChange = (rating: number) => {
    }

    // Function to call when the input is touched (when a star is clicked).
    onTouched = () => {
    }

    // Allows Angular to register a function to call when the model (rating) changes.
    // Save the function as a property to call later here.
    registerOnChange(fn: (rating: number) => void): void {
        this.onChange = fn;
    }

    // Allows Angular to register a function to call when the input has been touched.
    // Save the function as a property to call later here.
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
}

/*
export function FlyMakeProviderNgModel(type: any) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}*/
