import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'flyTime'
})
@Injectable()
export class FlyTimePipe implements PipeTransform {

    transform(value: any, args: any[] = null): string {
        return this.formatValue(value);
    }

    formatValue(value) {
        if (value) {
            let str = value.toString();

            if (str.length === 3) {
                str = '0' + str;
            }

            str = str.replace(/\D/g, '');
            str = str.replace(/^(\d{2})(\d{2})/, '$1:$2');
            return str;
        }

        return null;
    }
}
