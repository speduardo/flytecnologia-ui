import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { FlyConfigService } from '../confg/fly-config.service';
import { FlyJwtService } from './fly-jwt.service';
import { FlyNotAuthenticatedError } from './fly-not-authenticated-error';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FlyAuthService {
    static clientId: string;

    loginEvent = new Subject<boolean>();

    redirectUrl: string;
    oauthTokenUrl: string;
    tokensRenokeUrl: string;
    jwtPayload: any;

    header: HttpHeaders;

    constructor(private http: HttpClient,
                private jwtService: FlyJwtService,
                public config: FlyConfigService) {

        this.oauthTokenUrl = `${config.apiUrl}/oauth/token`;
        this.tokensRenokeUrl = `${config.apiUrl}/login/revoke`;
        this.loadToken();

        this.header = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': config.authorizationBasicCode
        });
    }

    static token() {
        return localStorage.getItem('token');
    }

    logout(): Observable<void> {
        return new Observable(observer => {
            const headers = new HttpHeaders({
                'Authorization': 'Bearer ' + FlyAuthService.token()
            });

            this.http.delete(this.tokensRenokeUrl, {headers, withCredentials: true})
                .subscribe(
                    () => {
                        this.cleanAccessToken();

                        observer.next();
                        observer.complete();
                    }, () => {
                        this.cleanAccessToken();

                        observer.error();
                        observer.complete();
                    }
                );
        });
    }

    login(username: string, password: string): Observable<any> {
        return new Observable(observer => {
            const headers = this.header;

            const body = `client=angular&username=${username}&password=${password}&grant_type=password`;

            this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: true})
                .subscribe((response) => {
                    this.saveToken(response['access_token']);

                    observer.next(response);
                    observer.complete();
                }, (error) => {
                    if (error.status === 400) {
                        observer.error('Usuário ou password inválido!');
                    } else {
                        observer.error(error.toString());
                    }

                    observer.complete();
                });
        });
    }

    getNewAccessToken(): Observable<any> {
        return new Observable(observer => {
            const token = FlyAuthService.token();

            if (!token) {
                observer.error();
                observer.complete();
            } else {
                const headers = this.header;
                const body = 'grant_type=refresh_token';

                if (!this.config.production) {
                    console.log('Getting a new token...');
                }

                this.http.post(this.oauthTokenUrl, body,
                    {headers, withCredentials: true})
                    .subscribe(
                        response => {
                            this.saveToken(response['access_token']);

                            if (this.isAccessTokenInvalid(response['access_token'])) {
                                throw new FlyNotAuthenticatedError();
                            }

                            if (!this.config.production) {
                                console.log('Created a new access token!');
                            }

                            observer.next();
                            observer.complete();
                        },
                        error => {
                            observer.error(error);
                            observer.complete();

                            if (!this.config.production) {
                                console.error('Error renewing access token.', error);
                            }

                            throw new FlyNotAuthenticatedError();
                        });
            }
        });
    }

    cleanAccessToken() {
        localStorage.removeItem('token');
        this.jwtPayload = null;
        FlyAuthService.clientId = null;

        this.loginEvent.next(false);
    }

    isLogged(): boolean {
        return this.jwtPayload != null;
    }

    isAccessTokenInvalid(accessToken: string = null): boolean {
        const token = accessToken || FlyAuthService.token();

        if (!token) {
            return true;
        }

        if (this.jwtPayload === null) {
            this.saveToken(token);
        }

        return !token || this.jwtService.isTokenExpired(this.jwtPayload);
    }

    hasPermission(permissao: string): boolean {
        if (!this.config.production && !this.config.validatePermissionsInDebugMode) {
            return true;
        }

        return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
    }

    hasAnyPermission(roles: Array<string>): boolean {
        if (!this.config.production && !this.config.validatePermissionsInDebugMode) {
            return true;
        }
        for (const role of roles) {
            if (this.hasPermission(role)) {
                return true;
            }
        }

        return false;
    }

    private saveToken(token: string): void {
        this.jwtPayload = this.jwtService.decodeToken(token);
        localStorage.setItem('token', token);
        FlyAuthService.clientId = this.jwtPayload.cl;

        this.loginEvent.next(true);
    }

    private loadToken() {
        const token = FlyAuthService.token();

        if (token) {
            this.saveToken(token);
        }
    }
}
