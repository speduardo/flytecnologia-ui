import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import './../confg/rxjs-operators.config';

import { FlyAuthService } from './fly-auth.service';


@Injectable()
export class FlyHttpClient {

    constructor(private auth: FlyAuthService,
                private http: HttpClient) {
    }

    public request<R>(req: HttpRequest<any>): Observable<HttpEvent<R>> {
        return this.checkToken(() => this.http.request(req));
    }

    /*public request(method: string, url: string, options?: any): Observable<any> {
        return this.checkToken(() => this.http.request(method, url, options));
    }*/

    public delete(url: string, options?: any): Observable<any> {
        return this.checkToken(() => this.http.delete(url, options));
    }

    public patch(url: string, body: any, options?: any): Observable<any> {
        return this.checkToken(() => this.http.patch(url, body, options));
    }

    public head(url: string, options?: any): Observable<any> {
        return this.checkToken(() => this.http.head(url, options));
    }

    public options(url: string, options?: any): Observable<any> {
        return this.checkToken(() => this.http.options(url, options));
    }

    public get(url: string, options?: any): Observable<any> {
        return this.checkToken(() => this.http.get(url, options));
    }

    public post(url: string, body: any, options?: any): Observable<any> {
        return this.checkToken(() => this.http.post(url, body, options));
    }

    public put(url: string, body: any, options?: any): Observable<any> {
        return this.checkToken(() => this.http.put(url, body, options));
    }

    private checkToken(fn: Function): Observable<any> {
        if (this.auth.isAccessTokenInvalid()) {

            return new Observable(observer => {
                this.auth.getNewAccessToken().subscribe(
                    () => {
                        fn().subscribe(
                            response => {
                                observer.next(response);
                                observer.complete();
                            }, error => {
                                observer.error(error);
                                observer.complete();
                            }
                        );
                    }, (error) => {
                        observer.error(error);
                        observer.complete();
                    }
                );
            });
        } else {
            return fn();
        }
    }
}
