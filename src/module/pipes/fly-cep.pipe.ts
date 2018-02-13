import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'flyCep'
})
@Injectable()
export class FlyCepPipe implements PipeTransform {

    transform(value: any, args: any[] = null): string {
        return this.formatValue(value);
    }

    formatValue(value) {
        if (!value) {
            return '';
        }

        let str = value.toString();
        str = str.replace(/\D/g, '');
        str = str.replace(/^(\d{2})(\d{3})(\d)/, '$1.$2-$3');
        return str;
    }
}
