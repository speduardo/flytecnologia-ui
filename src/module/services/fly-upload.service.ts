import { Injectable } from '@angular/core';
import { HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FlyHttpClient } from '../security/fly-http-client';

@Injectable()
export class FlyUploadService {

    constructor(private http: FlyHttpClient) {
    }

    pushFileToStorage(url: string, file: File): Observable<HttpEvent<{}>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const customHeadersToSave = new HttpHeaders({
            'Content-Type': 'multipart/form-data'
        });

        const req = new HttpRequest('POST', url, formData, {
            headers: customHeadersToSave,
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }
}
