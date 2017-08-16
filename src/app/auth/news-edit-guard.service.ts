import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UsersService } from '../admin/users.service';
import { NewsService } from '../news/news.service';
import { AuthService } from './auth.service';

@Injectable()
export class NewsEditGuard implements CanActivate {
    usersService: UsersService;
    newsService: NewsService;
    authService: AuthService;

    constructor(
        @Inject(UsersService) usersService: UsersService,
        @Inject(NewsService) newsService: NewsService,
        @Inject(AuthService) authService: AuthService
    ) {
        this.usersService = usersService;
        this.newsService = newsService;
        this.authService = authService;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.checkAuth()) {
            if (route.params.id) {
                return (this.authService.checkUserCategory(['admin'])
                    || this.newsService.getNewsPost(route.params.id).authorId === this.usersService.getCurrentUser().id);
            } else {
                return this.authService.checkUserCategory(['admin', 'provider']);
            }
        }
        return false;
    }
}
