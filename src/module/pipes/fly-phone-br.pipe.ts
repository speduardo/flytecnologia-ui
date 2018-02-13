import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'flyPhoneBr'
})
@Injectable()
export class FlyPhoneBrPipe implements PipeTransform {

    transform(value: any, args: any[] = null): string {
        return this.formatValue(value);
    }

    formatValue(value) {
        if (value) {
            let str = value.toString();
            str = str.replace(/\D/g, '');

            if (str.length === 11) {
                str = str.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else {
                str = str.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            }
            return str;
        }
    }
}
