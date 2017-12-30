import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelper} from 'angular2-jwt';

import {FlyConfigService} from '../services/fly-config.service';

@Injectable()
export class FlyAuthService {
    oauthTokenUrl: string;
    tokensRenokeUrl: string;
    jwtPayload: any;

    header: HttpHeaders;

    constructor(private http: HttpClient,
                private jwtHelper: JwtHelper,
                private configService: FlyConfigService) {
        this.oauthTokenUrl = `${configService.apiUrl}/oauth/token`;
        this.tokensRenokeUrl = `${configService.apiUrl}/login/revoke`;
        this.loadToken();

        this.header = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': configService.authorizationBasicCode
        });
    }

    static token() {
        return localStorage.getItem('token');
    }

    logout(): Promise<void> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + FlyAuthService.token()
        });

        return this.http.delete(this.tokensRenokeUrl, {headers, withCredentials: true})
            .toPromise()
            .then(() => {
                this.cleanAccessToken();
            });
    }

    login(username: string, password: string): Promise<void> {
        const headers = this.header;

        const body = `client=angular&username=${username}&password=${password}&grant_type=password`;

        return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: true})
            .toPromise()
            .then(response => {
                this.saveToken(response['access_token']);
            })
            .catch(response => {
                if (response.status === 400) {
                    const responseJson = response.json();

                    if (responseJson.error === 'invalid_grant') {
                        return Promise.reject('Usuário ou password inválida!');
                    }
                }

                return Promise.reject(response);
            });
    }

    getNewAccessToken(): Promise<void> {
        const token = FlyAuthService.token();

        if (!token) {
            return Promise.resolve(null);
        }

        const headers = this.header;
        const body = 'grant_type=refresh_token';

        return this.http.post(this.oauthTokenUrl, body,
            {headers, withCredentials: true})
            .toPromise()
            .then(response => {
                this.saveToken(response['access_token']);

                console.log('Novo access token criado!');

                return Promise.resolve(null);
            })
            .catch(response => {
                console.error('Erro ao renovar token.', response);
                return Promise.resolve(null);
            });
    }

    cleanAccessToken() {
        localStorage.removeItem('token');
        this.jwtPayload = null;
    }

    isAccessTokenInvalid() {
        const token = FlyAuthService.token();

        return !token || this.jwtHelper.isTokenExpired(token);
    }

    hasPermission(permissao: string) {
        return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
    }

    hasAnyPermission(roles: Array<string>) {
        for (const role of roles) {
            if (this.hasPermission(role)) {
                return true;
            }
        }

        return false;
    }

    private saveToken(token: string) {
        this.jwtPayload = this.jwtHelper.decodeToken(token);
        localStorage.setItem('token', token);
    }

    private loadToken() {
        const token = FlyAuthService.token();

        if (token) {
            this.saveToken(token);
        }
    }
}
