import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FlyAuthService } from './fly-auth.service';

@Injectable()
export class FlyAuthGuard implements CanActivate, CanLoad {

    constructor(private auth: FlyAuthService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const token = FlyAuthService.token();

        if (!token) {
            this.router.navigate(['/login']);
            return false;
        }

        if (this.auth.isAccessTokenInvalid()) {
            return new Observable(observer => {
                this.auth.getNewAccessToken()
                    .subscribe(() => {
                        observer.next(true);
                        observer.complete();
                    }, () => {
                        observer.next(false);
                        observer.complete();
                    });
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

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        if (this.auth.isLogged()) {
            this.auth.redirectUrl = null;
            return true;
        }

        this.auth.redirectUrl = window.location.pathname;
        this.router.navigate(['/login']);

        return false;
    }
}
