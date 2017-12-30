import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatDialogModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AuthModule} from 'angular2-jwt';

import 'hammerjs';

import {FlyInputTextComponent} from './components/fly-input-text/fly-input-text.component';
import {FlyLegendComponent} from './components/fly-legend/fly-legend.component';
import {FlyHrComponent} from './components/fly-hr/fly-hr.component';
import {FlyUppercaseInputDirective} from './directives/fly-uppercase-input.directive';
import {FlyCpfPipe} from './pipes/fly-cpf.pipe';
import {FlyService} from './services/fly.service';
import {FlyErrorHandlerService} from './services/fly-error-handler.service';
import {FlyUtilService} from './services/fly-util.service';
import {FlyAlertService} from './services/fly-alert.service';
import {FlyTabsetComponent} from './components/fly-tabset/fly-tabset.component';
import {FlyTabComponent} from './components/fly-tabset/fly-tab/fly-tab.component';
import {FlyAlertYesNoComponent} from './components/fly-alert/fly-alert-yes-no/fly-alert-yes-no.component';
import {FlyAlertOkComponent} from './components/fly-alert/fly-alert-ok/fly-alert-ok.component';
import {FlyConfigService} from './services/fly-config.service';
import {FlyNotFoundComponent} from './components/fly-not-found/fly-not-found.component';
import {FlySecurityInterceptor} from './security/fly-security.interceptor';
import {FlyHttpClient} from './security/fly-http-client';
import {FlyAuthGuard} from './security/fly-auth.guard';
import {FlyTokenService} from './security/fly-token.service';
import {FlyNotAuthorizedComponent} from './components/fly-not-authorized/fly-not-authorized.component';
import {FlyAuthService} from './security/fly-auth.service';


export * from './components/base/fly-abstract-ng-model';
export * from './components/base/fly-base-input';
export * from './components/fly-input-text/fly-input-text.component';
export * from './components/fly-legend/fly-legend.component';
export * from './components/fly-hr/fly-hr.component';
export * from './components/fly-tabset/fly-tab/fly-tab.component';
export * from './components/fly-tabset/fly-tabset.component';
export * from './components/fly-alert/fly-alert-ok/fly-alert-ok.component';
export * from './components/fly-alert/fly-alert-yes-no/fly-alert-yes-no.component';
export * from './components/fly-not-found/fly-not-found.component';
export * from './components/fly-not-authorized/fly-not-authorized.component';

export * from './directives/fly-uppercase-input.directive';

export * from './pipes/fly-cpf.pipe';

export * from './services/fly-util.service';
export * from './services/fly.service';
export * from './services/fly-config.service';
export * from './services/fly-alert.service';
export * from './services/fly-error-handler.service';

export * from './security/fly-auth.service';
export * from './security/fly-auth.guard';
export * from './security/fly-http-client';
export * from './security/fly-not-authenticated-error';
export * from './security/fly-security.interceptor';
export * from './security/fly-token.service';


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AuthModule,
        RouterModule,
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
        FlyAlertOkComponent,
        FlyNotFoundComponent,
        FlyNotAuthorizedComponent
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
        FlyAlertOkComponent,
        FlyNotFoundComponent,
        FlyNotAuthorizedComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: FlySecurityInterceptor,
            multi: true
        },
        FlyTokenService,
        FlyAuthService,
        FlyAuthGuard,
        FlyHttpClient,
        FlyUtilService,
        FlyAlertService,
        FlyService,
        FlyConfigService,
        FlyErrorHandlerService,
    ]
})
export class FlytecnologiaUiModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FlytecnologiaUiModule,
            providers: [
                FlyTokenService,
                FlyAuthService,
                FlyAuthGuard,
                FlyHttpClient,
                FlyUtilService,
                FlyAlertService,
                FlyService,
                FlyConfigService,
                FlyErrorHandlerService,
            ]
        };
    }
}
