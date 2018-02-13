import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlyAppModuleConfigService } from '../../../confg/fly-app-module-config.service';
import { FlyAuthService } from '../../../security/fly-auth.service';

@Component({
    selector: 'fly-footer',
    templateUrl: './fly-footer.component.html',
    styleUrls: ['./fly-footer.component.scss']
})
export class FlyFooterComponent implements OnInit {
    @Input() imgLogo: string;
    @Input() configService: FlyAppModuleConfigService;
    @Input() flyAuthService: FlyAuthService;

    @Output() clickLogo: EventEmitter<any> = new EventEmitter();
    @Output() logout: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    _clickLogo(): void {
        this.clickLogo.emit();
    }

    _logout(): void {
        this.logout.emit();
    }
}
