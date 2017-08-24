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
        return this.authService.checkUserCategory(['admin', 'provider']).map(
            res => {
                if (!res) {
                    this.router.navigate(['/home']);
                }
                return res;
            }
        );
    }
}
