import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable()
export class GuestGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate() {
        return this.authService.getAuth().map(
            auth => {
                if (auth) {
                    this.router.navigate(['/dash']);
                    return false;
                }
                return true;
            }
        );
    }
}
