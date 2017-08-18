import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UsersService } from '../admin/users.service';
import { NewsService } from '../news/news.service';
import { AuthService } from './auth.service';

@Injectable()
export class NewsEditGuard implements CanActivate {
    constructor(
        public usersService: UsersService,
        public newsService: NewsService,
        public authService: AuthService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.checkAuth()) {
            if (route.params.id) {
                // return (this.authService.checkUserCategory(['admin'])
                //     || this.newsService.getNewsPost(route.params.id).authorId === this.usersService.getCurrentUser().id);
                return true;
            } else {
                return this.authService.checkUserCategory(['admin', 'provider']);
            }
        }
        return false;
    }
}
