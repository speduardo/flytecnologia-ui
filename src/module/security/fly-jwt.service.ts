import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';

@Injectable()
export class FlyJwtService {

    decodeToken(token: string): string {
        return JWT(token);
    }

    isTokenExpired(payload): boolean {
        const current_time = new Date().getTime() / 1000;
        return current_time > payload.exp;
    }
}
