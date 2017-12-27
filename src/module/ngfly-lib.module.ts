import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatDialogModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

import 'hammerjs';

import {FlyInputTextComponent} from '../module/components/fly-input-text/fly-input-text.component';
import {FlyLegendComponent} from '../module/components/fly-legend/fly-legend.component';
import {FlyHrComponent} from '../module/components/fly-hr/fly-hr.component';
import {FlyUppercaseInputDirective} from '../module/directives/fly-uppercase-input.directive';
import {FlyCpfPipe} from '../module/pipes/fly-cpf.pipe';
import {FlyService} from '../module/services/fly.service';
import {FlyUtilService} from '../module/services/fly-util.service';
import {FlyAlertService} from '../module/components/fly-alert/fly-alert.service';
import {FlyTabsetComponent} from '../module/components/fly-tabset/fly-tabset.component';
import {FlyTabComponent} from '../module/components/fly-tabset/fly-tab/fly-tab.component';
import {FlyAlertYesNoComponent} from '../module/components/fly-alert/fly-alert-yes-no/fly-alert-yes-no.component';
import {FlyAlertOkComponent} from '../module/components/fly-alert/fly-alert-ok/fly-alert-ok.component';
import {HttpClientModule} from '@angular/common/http';

export * from '../module/components/fly-input-text/fly-input-text.component';
export * from '../module/components/fly-legend/fly-legend.component';
export * from '../module/components/fly-hr/fly-hr.component';
export * from '../module/directives/fly-uppercase-input.directive';
export * from '../module/components/fly-tabset/fly-tab/fly-tab.component';
export * from '../module/components/fly-tabset/fly-tabset.component';
export * from '../module/components/fly-alert/fly-alert-ok/fly-alert-ok.component';
export * from '../module/components/fly-alert/fly-alert-yes-no/fly-alert-yes-no.component';
export * from '../module/pipes/fly-cpf.pipe';
export * from '../module/services/fly.service';
export * from '../module/components/base/fly-abstract-ng-model';
export * from '../module/components/base/fly-base-input';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,

        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatSidenavModule,
        MatDialogModule,
    ],
    declarations: [
        FlyInputTextComponent,
        FlyLegendComponent,
        FlyHrComponent,
        FlyTabsetComponent,
        FlyTabComponent,
        FlyUppercaseInputDirective,
        FlyCpfPipe,
        FlyAlertYesNoComponent,
        FlyAlertOkComponent
    ],
    exports: [
        FlyInputTextComponent,
        FlyLegendComponent,
        FlyHrComponent,
        FlyTabsetComponent,
        FlyTabComponent,
        FlyUppercaseInputDirective,
        FlyCpfPipe,
        FlyAlertYesNoComponent,
        FlyAlertOkComponent
    ],
    providers: [
        FlyUtilService,
        FlyAlertService,
        FlyService
    ]
})
export class NgFlyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgFlyModule,
            providers: [
                FlyUtilService,
                FlyAlertService,
                FlyService
            ]
        };
    }
}
