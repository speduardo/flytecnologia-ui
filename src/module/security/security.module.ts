import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlySecurityInterceptor } from './fly-security.interceptor';
import { CommonModule } from '@angular/common';
import { FlyAuthService } from './fly-auth.service';
import { FlyAuthGuard } from './fly-auth.guard';
import { FlyTokenService } from './fly-token.service';
import { FlyHttpClient } from './fly-http-client';
import { FlyNotAuthorizedComponent } from '../components/fly-not-authorized/fly-not-authorized.component';
import { FlyJwtService } from './fly-jwt.service';
import { FlyCanDeactivateAppModule } from './fly-can-deactivate-app-module';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [
        FlyNotAuthorizedComponent
    ],
    exports: [
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
        FlyCanDeactivateAppModule,
        FlyHttpClient,
        FlyJwtService
    ]
})
export class FlySecurityModule {
}
