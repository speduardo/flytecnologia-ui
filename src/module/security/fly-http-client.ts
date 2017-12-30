import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {FlyAuthService} from './fly-auth.service';
import {FlyNotAuthenticatedError} from './fly-not-authenticated-error';


@Injectable()
export class FlyHttpClient {

    constructor(private auth: FlyAuthService,
                private http: HttpClient) {
    }

    public delete(url: string, options?: any): Observable<Object> {
        return this.checkToken(() => this.http.delete(url, options));
    }

    public patch(url: string, body: any, options?: any): Observable<Response> {
        return this.checkToken(() => this.http.patch(url, body, options));
    }

    public head(url: string, options?: any): Observable<Response> {
        return this.checkToken(() => this.http.head(url, options));
    }

    public options(url: string, options?: any): Observable<Response> {
        return this.checkToken(() => this.http.options(url, options));
    }

    public get(url: string, options?: any): Observable<Response> {
        return this.checkToken(() => this.http.get(url, options));
    }

    public post(url: string, body: any, options?: any): Observable<Response> {
        return this.checkToken(() => this.http.post(url, body, options));
    }

    public put(url: string, body: any, options?: any): Observable<Response> {
        return this.checkToken(() => this.http.put(url, body, options));
    }

    private checkToken(fn: Function): Observable<Response> {
        if (this.auth.isAccessTokenInvalid()) {
            console.log('Requisição HTTP com access token inválido. Obtendo novo token...');

            const getNewAccessToken = this.auth.getNewAccessToken()
                .then(() => {
                    if (this.auth.isAccessTokenInvalid()) {
                        throw new FlyNotAuthenticatedError();
                    }

                    return fn().toPromise();
                });

            return Observable.fromPromise(getNewAccessToken);
        } else {
            return fn();
        }
    }

}
