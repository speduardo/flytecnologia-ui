import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'flyDatePipe'
})
@Injectable()
export class FlyDatePipe implements PipeTransform {

    transform(value: any, args: any[] = null): string {
        return value;
    }
}
