import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NgModel } from '@angular/forms';

import { FlyUtilService } from '../../services/fly-util.service';
import { FlyBaseInput } from '../base/fly-base-input';
import { ngModelProvider } from '../base/fly-abstract-ng-model';
import { FlyConfigService } from '../../confg/fly-config.service';

import * as moment from 'moment';
import { IMyDpOptions, IMyMarkedDates } from 'mydatepicker';

let nextUniqueId = 0;

@Component({
    selector: 'fly-input-date-inline',
    templateUrl: './fly-input-date-inline.component.html',
    styleUrls: ['./fly-input-date-inline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        ngModelProvider(FlyInputDateInlineComponent)
    ]
})
export class FlyInputDateInlineComponent extends FlyBaseInput implements OnInit, OnChanges {
    @Input() label: string;
    @Input() hideLabel: boolean;
    @Input() id = `fly-input-date-inline-${nextUniqueId++}`;
    @Input() required = false;
    @Input() requiredConditional = false;
    @Input() selectOnTab: boolean;
    @Input() dateInputFormat;

    @Input() minYear: number;
    @Input() maxYear: number;
    @Input() year: number;
    @Input() month: number;
    @Input() markDates: Array<IMyMarkedDates>;

    @Input() showMonthSelector = true;
    @Input() showYearSelector = true;

    @ViewChild('inputHtml') inputHtml: ElementRef;
    @ViewChild('inputField') inputField: NgModel;

    defaultMonth: string;
    myDatePickerOptions: IMyDpOptions;

    constructor(private utilService: FlyUtilService,
                private configService: FlyConfigService) {
        super(utilService);

        this.configMyDatePricker();
    }

    configMyDatePricker(): void {
        if (!this.dateInputFormat) {
            this.dateInputFormat = this.configService.dateInputFormat.toUpperCase();
        }

        this.myDatePickerOptions = <IMyDpOptions>{
            dateFormat: this.configService.datePickerTheme,
            inline: true,
            showTodayBtn: false,
            showDecreaseDateBtn: false,
        };

        this.configFixedProperties();
        this.configDefaultMonth();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.configFixedProperties();
        this.configDefaultMonth();
    }

    configFixedProperties(): void {
        if (this.myDatePickerOptions) {
            this.myDatePickerOptions.monthSelector = this.showMonthSelector;
            this.myDatePickerOptions.yearSelector = this.showYearSelector;
        }
    }

    configDefaultMonth(): void {
        if (this.year) {
            if (this.month) {
                this.defaultMonth = (this.month < 10 ? ('0' + this.month) : this.month) + '-' + this.year;
            }

            this.myDatePickerOptions.maxYear = this.year;
            this.myDatePickerOptions.minYear = this.year;
        }

        if (this.maxYear) {
            this.myDatePickerOptions.maxYear = this.maxYear;
        }

        if (this.minYear) {
            this.myDatePickerOptions.maxYear = this.minYear;
        }

        if (!this.showMonthSelector && this.year && this.month) {
            this.myDatePickerOptions.disableUntil = {year: this.year, month: this.month, day: 1};

            const lastDay = this.utilService.getLastDayOfMonth(this.year, this.month);

            this.myDatePickerOptions.disableSince = {year: this.year, month: this.month, day: +lastDay};
        }
    }

    public checkValue(value: any): Date {
        if (value && typeof value === 'string') {
            if (value.indexOf('-') >= 0) {
                value = moment(value, 'YYYY-MM-DD').toDate();
            } else {
                value = moment(value, 'DD/MM/YYYY').toDate();
            }
        }

        return value;
    }

    onChangeDate($event): void {
        if ($event && $event.date) {
            const dateStr = $event.date.year + '-' +
                (this.month < 10 ? ('0' + this.month) : this.month) + '-' + $event.date.day;
            $event.dateStr = dateStr;
            $event.dateObj = moment(dateStr, 'YYYY-MM-DD').toDate();
        }

        super._change($event);
    }

}
