import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'fly-header',
    templateUrl: './fly-header.component.html',
    styleUrls: ['./fly-header.component.scss']
})
export class FlyHeaderComponent implements OnInit {

    @Input() headerTitle: string;
    @Input() imgLogo: string;

    @Output() clickLogo: EventEmitter<any> = new EventEmitter();
    @Output() logout: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    _clickLogo(): void {
        this.clickLogo.emit();
    }

    _logout(): void {
        this.logout.emit();
    }

    ngOnInit(): void {
    }

}
