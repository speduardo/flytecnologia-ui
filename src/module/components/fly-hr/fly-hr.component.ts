import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fly-hr',
    templateUrl: './fly-hr.component.html',
    styleUrls: ['./fly-hr.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlyHrComponent implements OnInit {

    @Input() heading: string;
    @Input() iconClass: string;

    constructor() {
    }

    ngOnInit() {
    }
}
