import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FlyAppService } from '../../services/fly-app.service';
import { FlyAppModuleConfigService } from '../../confg/fly-app-module-config.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'fly-index-module',
    templateUrl: './fly-index-module.component.html',
    styleUrls: ['./fly-index-module.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FlyIndexModuleComponent implements OnInit {

    @Input() flyModuleService: FlyAppModuleConfigService;

    minHeightViewPort: string;

    constructor(public service: FlyAppService) {
    }

    ngOnInit() {
        this.service.appModule = this.flyModuleService.appModule;

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
        this.minHeightViewPort = window.innerHeight + 'px';
    }
}
