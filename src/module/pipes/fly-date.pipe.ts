import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { FlyConfigService } from '../confg/fly-config.service';

import * as moment from 'moment';

@Pipe({
    name: 'flyDate'
})
@Injectable()
export class FlyDatePipe implements PipeTransform {

    constructor(private configService: FlyConfigService) {
    }

    transform(value: any, args: any[] = null): string {
        return this.formatValue(value);
    }

    formatValue(value) {
        if (value) {
            if (value instanceof Date) {
                return moment(value).format(this.configService.datePipeFormat);
            } else {
                return moment(value).format(this.configService.datePipeFormat);
            }
        }
        return value;
    }
}
