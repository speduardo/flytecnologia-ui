import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FlyFormService } from '../service/fly-form.service';
import { FlyModalDefaultData } from '../../services/fly-modal.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { FlyUtilService } from '../../services/fly-util.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'fly-form-default',
    templateUrl: './fly-form-default.component.html',
    styleUrls: ['./fly-form-default.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('controlbar', [
            state('normal', style({opacity: 1})),
            transition('normal => fixed', animate('300ms 0s ease-in', keyframes([
                style({opacity: 0, transform: 'translateX(-30px)', offset: 0}),
                style({opacity: 1, transform: 'translateX(0px)', offset: 1})
            ]))),
            transition('fixed => normal', animate('300ms 0s ease-out', keyframes([
                style({opacity: 0, transform: 'translateX(30px)', offset: 0}),
                style({opacity: 1, transform: 'translateX(0px)', offset: 1})
            ])))
        ])
    ]
})
export class FlyFormDefaultComponent extends FlyFormService implements OnInit, OnDestroy, AfterViewInit {
    scrollSubscription: Subscription;
    controlbarState = 'normal';

    @ViewChild('cmark') cmark: ElementRef;

    isMarksInViewPort = true;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) public modalDefaultData: FlyModalDefaultData) {
        super();
    }

    ngOnInit() {
        setTimeout(() => {
            this.service.isFormDefault = true;

            if (this.modalDefaultData) {
                this.service.masterService = this.modalDefaultData ? this.modalDefaultData.flyService : null;
                this.service.isPopup = !!this.modalDefaultData;

                if (this.service.isPopup) {
                    this.service.modalDefaultRef = this.service.masterService.modalDefaultRef;
                }
            }
        }, 0);

        this.service.loadDefaultValuesCrud().subscribe(
            () => {
                this.isDefaultValuesAvalilable = true;

                setTimeout(() => {
                    this.service.form = this.flyForm;
                    this.service.onInitForm();
                    this.checkControlbarFixed();
                });
            });

        this.scrollSubscription = this.onMoveScrool()
            .subscribe(() => this.checkControlbarFixed());
    }

    checkControlbarFixed(): void {
        this.isMarksInViewPort = this.cmark && FlyUtilService.isInViewport(this.cmark.nativeElement);

        this.controlbarState = this.isMarksInViewPort ? 'normal' : 'fixed';
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this.checkControlbarFixed();
    }

    ngOnDestroy(): void {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
    }
}
