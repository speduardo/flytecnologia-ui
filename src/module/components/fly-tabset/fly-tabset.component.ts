import {
    AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList,
    ViewEncapsulation
} from '@angular/core';
import { FlyTabComponent } from './fly-tab/fly-tab.component';
import { FlyUtilService } from '../../services/fly-util.service';

@Component({
    selector: 'fly-tabset',
    templateUrl: './fly-tabset.component.html',
    styleUrls: ['./fly-tabset.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlyTabsetComponent implements AfterContentInit, OnInit {

    /*
     https://juristr.com/blog/2016/02/learning-ng2-creating-tab-component/
     https://embed.plnkr.co/0YKxZl3KksWy2lRRta6x/
     https://plnkr.co/edit/afhLA8wHw9LRnzwwTT3M?p=preview
     */
    @ContentChildren(FlyTabComponent) tabs: QueryList<FlyTabComponent>;

    @Input() vertical: boolean;
    @Input() justified: boolean;
    @Input() type: string;
    @Input() color: string;
    @Output() selectedIndexChange = new EventEmitter<number>();
    @Output() public select: EventEmitter<FlyTabComponent> = new EventEmitter();

    public classColor: string;

    constructor(private flyUtilService: FlyUtilService) {
    }

    private _selectedIndex: number;

    @Input()
    public get selectedIndex() {
        return this._selectedIndex;
    }

    public set selectedIndex(index) {
        if (this._selectedIndex === index) {
            return;
        }

        if (this.tabs && this.tabs.length > index) {
            this.selectTab(this.tabs.toArray()[index]);
        } else if (index) {
            this._selectedIndex = index;
        }
    }

    ngOnInit() {
        this.defineClassColor();
    }

    defineClassColor() {
        this.classColor = 'nav-tabs-' + (this.color ? this.color : 'light-blue');
    }

    ngAfterContentInit() {
        /*Preventing the exception ExpressionChangedAfterItHasBeenCheckedError*/
        setTimeout(() => {
            if (this._selectedIndex > 0) {
                this.selectTab(this.tabs.toArray()[this._selectedIndex]);
            } else {
                this.selectTab(this.tabs.first);
            }
        }, 1);
    }

    public selectTab(tab: FlyTabComponent): void {
        if (this.flyUtilService.isTrue(tab.disabled)) {
            return;
        }
        // deactivate all tabs
        this.tabs.toArray().forEach(tabInstance => tabInstance.active = false);
        this._selectedIndex = this.tabs.toArray().indexOf(tab);
        this.selectedIndexChange.emit(this._selectedIndex);

        tab.active = true;
        tab.lazy = false;

        this.select.emit(tab);
    }
}
