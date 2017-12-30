import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FlyAuthService} from './fly-auth.service';


@Injectable()
export class FlyAuthGuard implements CanActivate {

    constructor(private auth: FlyAuthService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.auth.isAccessTokenInvalid()) {
            console.log('Navegação com access token inválido. Obtendo novo token...');

            return this.auth.getNewAccessToken()
                .then(() => {
                    if (this.auth.isAccessTokenInvalid()) {
                        this.router.navigate(['/login']);
                        return false;
                    }

                    return true;
                });
        } else if (route.routeConfig.path === 'login') {
            this.router.navigate(['/home']);
            return false;
        } else if (!!route.data.roles && !this.auth.hasAnyPermission(route.data.roles)) {
            this.router.navigate(['/not-authorized']);
            return false;
        }

        return true;
    }

}
