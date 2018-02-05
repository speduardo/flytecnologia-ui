import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FlyAbstractNgModel, ngModelProvider } from '../base/fly-abstract-ng-model';
import { FlyUtilService } from '../../services/fly-util.service';

let nextUniqueId = 0;

@Component({
    selector: 'fly-input-checkbox',
    templateUrl: './fly-input-checkbox.component.html',
    styleUrls: ['./fly-input-checkbox.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        ngModelProvider(FlyInputCheckboxComponent)
    ]
})
export class FlyInputCheckboxComponent extends FlyAbstractNgModel<any> implements OnInit {
    @Input() label: string;
    @Input() id = `fly-checkbox-${nextUniqueId++}`;
    @Input() disabled = false;
    @Input() alignInRow = true;

    constructor(private flyUtilService: FlyUtilService) {
        super();
    }

    ngOnInit() {
    }

}
