import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddItemGuard implements CanActivate {
    constructor(public authService: AuthService) { }
    private obs: Observable<boolean>;

    canActivate() {
        return this.authService.checkUserCategory(['admin', 'provider']);
    }
}
