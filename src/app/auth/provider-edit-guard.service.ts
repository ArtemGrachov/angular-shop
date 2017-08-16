import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UsersService } from '../admin/users.service';
import { ProvidersService } from '../providers/providers.service';
import { AuthService } from './auth.service';

@Injectable()
export class ProviderEditGuard implements CanActivate {
    usersService: UsersService;
    providersService: ProvidersService;
    authService: AuthService;

    constructor(
        @Inject(UsersService) usersService: UsersService,
        @Inject(ProvidersService) providersService: ProvidersService,
        @Inject(AuthService) authService: AuthService
    ) {
        this.usersService = usersService;
        this.providersService = providersService;
        this.authService = authService;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.checkAuth()) {
            if (route.params.id) {
                return (this.authService.checkUserCategory(['admin'])
                    || this.providersService
                        .getProvider(route.params.id).users
                        .indexOf(this.usersService.getCurrentUser().id) > -1);
            } else {
                return this.authService.checkUserCategory(['admin']);
            }
        }
        return false;
    }
}
