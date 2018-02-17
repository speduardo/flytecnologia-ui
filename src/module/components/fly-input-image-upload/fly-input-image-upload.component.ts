import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { FlyAbstractNgModel, ngModelProvider } from '../base/fly-abstract-ng-model';

let nextUniqueId = 0;

@Component({
    selector: 'fly-input-image-upload',
    templateUrl: './fly-input-image-upload.component.html',
    styleUrls: ['./fly-input-image-upload.component.scss'],
    providers: [
        ngModelProvider(FlyInputImageUploadComponent)
    ]
})
export class FlyInputImageUploadComponent extends FlyAbstractNgModel<string> implements OnInit {
    @Input() ngModelExtension: any;
    @Input() maxWidth = 800;
    @Input() maxHeight = 600;
    @Input() id = `fly-checkbox-${nextUniqueId++}`;

    @Output() ngModelExtensionChange = new EventEmitter<string>();

    isCompressing: boolean;

    constructor(private ng2ImgToolsService: Ng2ImgToolsService) {
        super();
    }

    ngOnInit() {
    }

    selectFile(event: any): void {
        const fileList: FileList = event.target.files;

        if (fileList.length > 0) {
            const ext = fileList[0].name.split('.').pop();
            let file = fileList[0];

            this.isCompressing = true;

            this.ng2ImgToolsService.resize([file], this.maxWidth, this.maxHeight)
                .subscribe(
                    result => {
                        this.isCompressing = false;
                        file = result;

                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.ngModelExtensionChange.emit(ext);
                            this.value = e.target['result'];
                        };
                        reader.readAsDataURL(file);

                    },
                    error => this.isCompressing = false);
        }
    }

    removeFile(): void {
        this.value = null;
        this.ngModelExtensionChange.emit(null);
    }
}
