import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FlyAlertService {

    constructor() {
    }

    showOk(message: string, title: string = 'Tudo certo!'): Observable<any> {
        return null;
    }

    confirm(message: string, title: string): Observable<any> {
        return null;
    }

    showError(message: string, title: string = 'Erro'): Observable<any> {
        return null;
    }
}
