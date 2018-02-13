import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlyAppService } from '../services/fly-app.service';
import { FlyAlertService } from '../services/fly-alert.service';


@Injectable()
export class FlyConfigService {

    validatePermissionsInDebugMode = false;
    production: boolean;
    apiUrl: string;
    authorizationBasicCode: string;
    dateInputFormat = 'DD/MM/YYYY';
    datePipeFormat = 'DD/MM/YYYY';

    /*
     *  theme-default, theme-green, theme-blue, theme-dark-blue
     *  theme-red, theme-orange
     *
     */
    datePickerTheme = 'theme-default';

    constructor(public router: Router,
                public appService: FlyAppService,
                public alertService: FlyAlertService) {

    }
}
