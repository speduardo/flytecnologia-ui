import { ErrorHandler, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { FlyAlertService } from '../services/fly-alert.service';
import { FlyNotAuthenticatedError } from '../security/fly-not-authenticated-error';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { FlyAuthService } from '../security/fly-auth.service';

@Injectable()
export class FlyErrorHandler implements ErrorHandler {
    route: Router;
    alert: FlyAlertService;
    authService: FlyAuthService;

    constructor(@Inject(Injector) private injector: Injector,
                private zone: NgZone) {
    }

    private service(): FlyAlertService {
        if (!this.alert) {
            this.alert = this.injector.get(FlyAlertService);
        }

        return this.alert;
    }

    private getAuthService(): FlyAuthService {
        if (!this.authService) {
            this.authService = this.injector.get(FlyAuthService);
        }

        return this.authService;
    }

    private router(): Router {
        if (!this.route) {
            this.route = this.injector.get(Router);
        }

        return this.route;
    }

    handleError(errorResponse: any) {
        let msg: string;

        if (typeof errorResponse === 'string') {
            msg = errorResponse;

        } else if (errorResponse instanceof FlyNotAuthenticatedError) {
            msg = 'Sua sessão expirou!';
            this.getAuthService().cleanAccessToken();
            this.zone.run(() => this.router().navigate(['/login']));

        } else if (errorResponse instanceof HttpErrorResponse
            && errorResponse.status >= 400 && errorResponse.status <= 499) {

            msg = 'Ocorreu um erro ao processar a sua solicitação';

            if (errorResponse.status === 403) {
                msg = 'Você não tem permissão para executar esta ação';
            }

            try {
                if (Array.isArray(errorResponse.error)) {
                    msg = '';
                    errorResponse.error.forEach((error) => {
                        msg += error.msgUser + '\n';

                        if (!!error.msgDev) {
                            console.error(error.msgDev);
                        }
                    });
                } else {
                    if (errorResponse.error.error === 'invalid_token') {
                        this.getAuthService().cleanAccessToken();
                        this.zone.run(() => this.router().navigate(['/login']));
                        return;
                    } else {
                        if (!environment.production) {
                            console.error(errorResponse.error);
                        }
                    }
                }
            } catch (e) {
                    console.error(errorResponse.error);
            }
        } else {
            msg = 'Erro ao processar a ação. Tente novamente.';

                console.error(errorResponse);
        }

        this.zone.run(() => this.service().error(msg));
    }
}
