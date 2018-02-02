import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FlyTokenService } from './fly-token.service';
import { FlyAuthService } from './fly-auth.service';


@Injectable()
export class FlySecurityInterceptor implements HttpInterceptor {
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

        if (!!FlyAuthService.clientId) {
            headers = headers.append('cl', FlyAuthService.clientId);
        }

        // add cl nos parametros
        return next.handle(req.clone({headers}));
    }
}
