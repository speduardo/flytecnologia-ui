import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';

@Injectable()
export class FlyIconConfig {

    constructor(iconRegistry: MatIconRegistry) {
        iconRegistry
            .registerFontClassAlias('fontawesome', 'fa');
    }
}
