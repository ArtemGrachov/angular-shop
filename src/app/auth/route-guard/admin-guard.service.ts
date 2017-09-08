import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    private obs: Observable<boolean>;

    canActivate() {
        const activate = this.authService.checkUserCategory(['admin']);
        if (!activate) {
            this.router.navigate(['/home']);
        }
        return activate;
    }
}
