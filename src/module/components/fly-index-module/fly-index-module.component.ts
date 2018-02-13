import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FlyAppService } from '../../services/fly-app.service';
import { FlyAppModuleConfigService } from '../../confg/fly-app-module-config.service';

@Component({
    selector: 'fly-index-module',
    templateUrl: './fly-index-module.component.html',
    styleUrls: ['./fly-index-module.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FlyIndexModuleComponent implements OnInit {

    @Input() flyModuleService: FlyAppModuleConfigService;

    constructor(public service: FlyAppService) {
    }

    ngOnInit() {
        this.service.appModule = this.flyModuleService.appModule;
    }
}
