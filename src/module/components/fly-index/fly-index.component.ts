import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { FlyAuthService } from '../../security/fly-auth.service';
import { FlyAppModuleConfigService } from '../../confg/fly-app-module-config.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FlyUtilService } from '../../services/fly-util.service';

@Component({
    selector: 'fly-index',
    templateUrl: './fly-index.component.html',
    styleUrls: ['./fly-index.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlyIndexComponent implements OnInit, AfterViewInit {
    minHeightViewPort: string;

    @Input() headerTitle: string;
    @Input() imgLogo: string;

    isLogged = false;

    constructor(public auth: FlyAuthService,
                public configService: FlyAppModuleConfigService,
                public flyAuthService: FlyAuthService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private ref: ChangeDetectorRef) {

        console.log('FlyIndexComponent');
    }

    ngOnInit(): void {
        this.defineHeightViewPort();

        this.onResizeScrool().subscribe(() => this.defineHeightViewPort());

        this.isLogged = this.auth.isLogged();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.auth.loginEvent.subscribe(value => {
                console.log('loginEvent => ' + value);

                this.isLogged = value;
                this.ref.detectChanges();
            });

            this.isLogged = this.auth.isLogged();
        }, 10);
    }

    onResizeScrool(): Observable<boolean> {
        return Observable
            .fromEvent(window, 'resize')
            .throttleTime(100)
            .map(Boolean);
    }

    defineHeightViewPort() {
        FlyUtilService.viewPortSize = window.innerHeight;
        this.minHeightViewPort = window.innerHeight + 'px';
    }

    onClickLogo(): void {
        const locationPath = this.location.path();

        if (locationPath === '/home' || !this.configService.indexRouter) {
            return;
        }

        if (this.location.path() === '/' + this.configService.indexRouter) {
            this.router.navigate(['']);
        } else {
            this.router.navigate([this.configService.indexRouter]);
        }
    }

    logout(): void {
        this.flyAuthService.logout()
            .subscribe(
                () => this.goToLogin(),
                () => this.goToLogin()
            );
    }

    goToLogin(): void {
        this.router.navigate(['/login']);
    }
}
