import { Injectable } from '@angular/core';

@Injectable()
export class FlyAppModuleConfigService {

    appModule: string;
    appNameModule: string;
    indexRouter: string;

    constructor() {
    }

    clean(): void {
        this.appModule = '';
        this.appNameModule = '';
        this.indexRouter = '';
    }

}
