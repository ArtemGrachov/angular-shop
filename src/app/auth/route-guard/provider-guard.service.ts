import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProviderGuard implements CanActivate {
    constructor(public authService: AuthService) { }
    private obs: Observable<boolean>;

    canActivate() {
        this.obs = new Observable(
            observer => {
                this.authService.getCurrentUser().subscribe(
                    (user: any) => {
                        if (user.category === 'provider') {
                            observer.next(true);
                        } else {
                            observer.next(false);
                        }
                    }
                );

            }
        );
        return this.obs;
    }
}
