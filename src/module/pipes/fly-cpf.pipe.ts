import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'flyCpf'
})
@Injectable()
export class FlyCpfPipe implements PipeTransform {

    transform(value: any, args: any[] = null): string {
        return this.formatValue(value);
    }

    formatValue(value) {
        if (value) {
            if (value.toString().length >= 11) {
                return this.insertMask(value.toString());
            }
            if (value.toString().length < 11) {
                value = value.toString();

                for (let i = value.length; i < 11; i++) {
                    value = '0' + value;
                }
                return this.insertMask(value);
            }
            return null;
        }
    }

    insertMask(input) {
        let str = input + '';
        str = str.replace(/\D/g, '');
        str = str.replace(/(\d{3})(\d)/, '$1.$2');
        str = str.replace(/(\d{3})(\d)/, '$1.$2');
        str = str.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return str;
    }
}
