import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {FlyTokenService} from './fly-token.service';


@Injectable()
export class FlySecurityInterceptor implements HttpInterceptor {
    auth: any;

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.has('Authorization')) {
            return next.handle(req);
        }

        const token = FlyTokenService.token();

        let headers = new HttpHeaders({
            'Accept': 'application/json'
        });

        if (!req.headers.has('Content-Type')) {
            headers = headers.append('Content-Type', 'application/json');
        }

        if (token) {
            headers = headers.append('Authorization', 'Bearer ' + token);
        }

        return next.handle(req.clone({headers}));
    }
}
