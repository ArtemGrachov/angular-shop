import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public authService: AuthService) { }

    canActivate() {
        return this.authService.getAuth().map(
            auth => {
                if (auth) {
                    return true;
                }
                return false;
            }
        );
    }
}
