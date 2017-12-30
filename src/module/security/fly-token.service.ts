import {Injectable} from '@angular/core';

@Injectable()
export class FlyTokenService {
    static token() {
        return localStorage.getItem('token');
    }
}
