import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import 'hammerjs';

import { FlyInputTextComponent } from './components/fly-input-text/fly-input-text.component';
import { FlyLegendComponent } from './components/fly-legend/fly-legend.component';
import { FlyHrComponent } from './components/fly-hr/fly-hr.component';
import { FlyUppercaseInputDirective } from './directives/fly-uppercase-input.directive';
import { FlyCpfPipe } from './pipes/fly-cpf.pipe';
import { FlyUtilService } from './services/fly-util.service';
import { FlyAlertService } from './services/fly-alert.service';
import { FlyTabsetComponent } from './components/fly-tabset/fly-tabset.component';
import { FlyTabComponent } from './components/fly-tabset/fly-tab/fly-tab.component';
import { FlyAlertYesNoComponent } from './components/fly-alert/fly-alert-yes-no/fly-alert-yes-no.component';
import { FlyAlertOkComponent } from './components/fly-alert/fly-alert-ok/fly-alert-ok.component';
import { FlyConfigService } from './confg/fly-config.service';
import { FlyNotFoundComponent } from './components/fly-not-found/fly-not-found.component';
import { FlySecurityInterceptor } from './security/fly-security.interceptor';
import { FlySecurityModule } from './security/security.module';
import { FlyIndexModuleComponent } from './components/fly-index-module/fly-index-module.component';
import { FlyAppService } from './services/fly-app.service';
import { FlyAppModuleConfigService } from './confg/fly-app-module-config.service';
import { FlyGridComponent } from './components/fly-grid/fly-grid.component';
import { FlyFormSearchComponent } from './components/fly-form-search/fly-form-search.component';
import { FlyFormCrudComponent } from './components/fly-form-crud/fly-form-crud.component';
import { FlyFormDefaultComponent } from './components/fly-form-default/fly-form-default.component';
import { FlyFormReportComponent } from './components/fly-form-report/fly-form-report.component';
import { FlyFormProcessingComponent } from './components/fly-form-processing/fly-form-processing.component';
import { FlyControlbarComponent } from './components/fly-controlbar/fly-controlbar.component';
import { FlyIconConfig } from './confg/fly-icon.config';
import { FlyErrorHandler } from './provider/fly-error-handler';
import { FlyInputAreaComponent } from './components/fly-input-area/fly-input-area.component';
import { FlyInputSelectComponent } from './components/fly-input-select/fly-input-select.component';
import { FlyInputRadioComponent } from './components/fly-input-radio/fly-input-radio.component';
import { FlyInputCheckboxComponent } from './components/fly-input-checkbox/fly-input-checkbox.component';
import { FlyInputDateComponent } from './components/fly-input-date/fly-input-date.component';
import { FlyInputUploadComponent } from './components/fly-input-upload/fly-input-upload.component';
import { FlyModalService } from './services/fly-modal.service';
import { FlyDatePipe } from './pipes/fly-date.pipe';
import { FlyInputAutocompleteComponent } from './components/fly-input-autocomplete/fly-input-autocomplete.component';

export * from './components/base/fly-abstract-ng-model';
export * from './components/base/fly-base-input';
export * from './components/fly-input-area/fly-input-area.component';
export * from './components/fly-input-checkbox/fly-input-checkbox.component';
export * from './components/fly-input-date/fly-input-date.component';
export * from './components/fly-input-radio/fly-input-radio.component';
export * from './components/fly-input-select/fly-input-select.component';
export * from './components/fly-input-upload/fly-input-upload.component';
export * from './components/fly-input-text/fly-input-text.component';
export * from './components/fly-input-autocomplete/fly-input-autocomplete.component';
export * from './components/fly-legend/fly-legend.component';
export * from './components/fly-hr/fly-hr.component';
export * from './components/fly-tabset/fly-tab/fly-tab.component';
export * from './components/fly-tabset/fly-tabset.component';
export * from './components/fly-alert/fly-alert-ok/fly-alert-ok.component';
export * from './components/fly-alert/fly-alert-yes-no/fly-alert-yes-no.component';
export * from './components/fly-not-found/fly-not-found.component';
export * from './components/fly-index-module/fly-index-module.component';
export * from './components/fly-not-authorized/fly-not-authorized.component';
export * from './components/fly-controlbar/fly-controlbar.component';

export * from './components/fly-grid/fly-grid.component';
export * from './components/fly-form-search/fly-form-search.component';
export * from './components/fly-form-crud/fly-form-crud.component';
export * from './components/fly-form-default/fly-form-default.component';
export * from './components/fly-form-report/fly-form-report.component';
export * from './components/fly-form-processing/fly-form-processing.component';

export * from './directives/fly-uppercase-input.directive';

export * from './pipes/fly-cpf.pipe';
export * from './pipes/fly-date.pipe';

export * from './services/fly.service';
export * from './services/fly-util.service';
export * from './services/fly-alert.service';
export * from './services/fly-app.service';
export * from './services/fly-modal.service';

export * from './provider/fly-error-handler';

export * from './confg/fly-config.service';
export * from './confg/fly-app-module-config.service';
export * from './confg/fly-icon.config';

export * from './security/fly-auth.service';
export * from './security/fly-auth.guard';
export * from './security/fly-can-deactivate-app-module';
export * from './security/fly-http-client';
export * from './security/fly-not-authenticated-error';
export * from './security/fly-security.interceptor';
export * from './security/fly-token.service';
export * from './security/fly-jwt.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatDialogModule,
        MatProgressBarModule,
        MatIconModule,
        MatRadioModule,
        MatCheckboxModule,
        TableModule,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TypeaheadModule.forRoot(),
        BsDropdownModule.forRoot(),
        FlySecurityModule
    ],
    declarations: [
        FlyLegendComponent,
        FlyHrComponent,
        FlyTabsetComponent,
        FlyTabComponent,
        FlyUppercaseInputDirective,
        FlyCpfPipe,
        FlyDatePipe,
        FlyAlertYesNoComponent,
        FlyAlertOkComponent,
        FlyNotFoundComponent,
        FlyIndexModuleComponent,
        FlyGridComponent,
        FlyFormSearchComponent,
        FlyFormCrudComponent,
        FlyFormDefaultComponent,
        FlyFormReportComponent,
        FlyFormProcessingComponent,
        FlyControlbarComponent,
        FlyInputTextComponent,
        FlyInputAreaComponent,
        FlyInputSelectComponent,
        FlyInputRadioComponent,
        FlyInputCheckboxComponent,
        FlyInputDateComponent,
        FlyInputUploadComponent,
        FlyInputAutocompleteComponent,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatDialogModule,
        MatProgressBarModule,
        MatIconModule,
        MatRadioModule,
        MatCheckboxModule,
        TableModule,
        PaginationModule,
        BsDatepickerModule,
        TypeaheadModule,
        BsDropdownModule,
        FlyLegendComponent,
        FlyHrComponent,
        FlyTabsetComponent,
        FlyTabComponent,
        FlyUppercaseInputDirective,
        FlyCpfPipe,
        FlyDatePipe,
        FlyAlertYesNoComponent,
        FlyAlertOkComponent,
        FlyNotFoundComponent,
        FlyIndexModuleComponent,
        FlyGridComponent,
        FlyFormSearchComponent,
        FlyFormCrudComponent,
        FlyFormDefaultComponent,
        FlyFormReportComponent,
        FlyFormProcessingComponent,
        FlyControlbarComponent,
        FlyInputTextComponent,
        FlyInputAreaComponent,
        FlyInputSelectComponent,
        FlyInputRadioComponent,
        FlyInputCheckboxComponent,
        FlyInputDateComponent,
        FlyInputUploadComponent,
        FlyInputAutocompleteComponent,
    ],
    entryComponents: [
        FlyAlertYesNoComponent,
        FlyAlertOkComponent
    ]
})
export class FlytecnologiaUiModule {
    /**
     * for root NgModule use imports:[FlytecnologiaUiModule.forRoot()]
     * for child modules you can use simple: imports:[FlytecnologiaUiModule]
     *
     * @returns {ModuleWithProviders}
     */
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FlytecnologiaUiModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: FlySecurityInterceptor,
                    multi: true
                },
                {
                    provide: ErrorHandler,
                    useClass: FlyErrorHandler
                },
                FlyUtilService,
                FlyAlertService,
                FlyConfigService,
                FlyAppService,
                FlyAppModuleConfigService,
                FlyIconConfig,
                FlyModalService
            ]
        };
    }

    static forChild(): ModuleWithProviders {
        return {
            ngModule: FlytecnologiaUiModule
        };
    }
}
