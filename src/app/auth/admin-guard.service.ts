import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UsersService } from '../admin/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        public authService: AuthService,
        public usersService: UsersService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.checkAuth()) {
            if (this.usersService.getCurrentUser().category === 'admin') {
                return true;
            }
        }

        return false;
    }
}
