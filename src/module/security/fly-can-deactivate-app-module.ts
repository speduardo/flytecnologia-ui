import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FlyAppModuleConfigService } from '../confg/fly-app-module-config.service';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class FlyCanDeactivateAppModule implements CanDeactivate<CanComponentDeactivate> {

    constructor(private configService: FlyAppModuleConfigService) {
    }

    canDeactivate(component: CanComponentDeactivate,
                  route: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot) {
        this.configService.clean();

        return component.canDeactivate ? component.canDeactivate() : true;
    }
}
