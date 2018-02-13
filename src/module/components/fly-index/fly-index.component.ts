import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
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
export class FlyIndexComponent implements OnInit {
    minHeightViewPort: string;

    @Input() headerTitle: string;
    @Input() imgLogo: string;

    constructor(public auth: FlyAuthService,
                public configService: FlyAppModuleConfigService,
                public flyAuthService: FlyAuthService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit() {
        this.defineHeightViewPort();

        this.onResizeScrool().subscribe(() => this.defineHeightViewPort());
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
