import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddItemGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    private obs: Observable<boolean>;

    canActivate() {
        const activate = this.authService.checkUserCategory(['admin', 'provider']);
        if (!activate) {
            this.router.navigate(['/home']);
        }
        return activate;
    }
}
