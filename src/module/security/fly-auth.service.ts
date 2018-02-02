import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { FlyConfigService } from '../confg/fly-config.service';
import { FlyJwtService } from './fly-jwt.service';

@Injectable()
export class FlyAuthService {
    redirectUrl: string;
    static clientId: string;
    oauthTokenUrl: string;
    tokensRenokeUrl: string;
    jwtPayload: any;

    header: HttpHeaders;

    constructor(private http: HttpClient,
                private jwtService: FlyJwtService,
                private config: FlyConfigService) {
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
                        const responseJson = error.json();

                        if (responseJson.error === 'invalid_grant') {
                            observer.error('Usuário ou password inválida!');
                        } else {
                            observer.error(error);
                        }

                        observer.complete();
                    }
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

                this.http.post(this.oauthTokenUrl, body,
                    {headers, withCredentials: true})
                    .subscribe(
                        response => {
                            this.saveToken(response['access_token']);

                            console.log('Novo access token criado!');

                            observer.next();
                            observer.complete();
                        },
                        error => {
                            observer.error(error);
                            observer.complete();

                            console.error('Erro ao renovar token.', error);
                        });
            }
        });
    }

    cleanAccessToken() {
        localStorage.removeItem('token');
        this.jwtPayload = null;
        FlyAuthService.clientId = null;
    }

    isLogged(): boolean {
        return this.jwtPayload != null && !this.isAccessTokenInvalid();
    }

    isAccessTokenInvalid(): boolean {
        const token = FlyAuthService.token();

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
    }

    private loadToken() {
        const token = FlyAuthService.token();

        if (token) {
            this.saveToken(token);
        }
    }
}
