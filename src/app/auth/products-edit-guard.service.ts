import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UsersService } from '../admin/users.service';
import { ProductsService } from '../products/products.service';
import { ProvidersService } from '../providers/providers.service';
import { AuthService } from './auth.service';

@Injectable()
export class ProductsEditGuard implements CanActivate {
    usersService: UsersService;
    productsService: ProductsService;
    providersService: ProvidersService;
    authService: AuthService;

    constructor(
        @Inject(UsersService) usersService: UsersService,
        @Inject(ProductsService) productsService: ProductsService,
        @Inject(ProvidersService) providersService: ProvidersService,
        @Inject(AuthService) authService: AuthService
    ) {
        this.usersService = usersService;
        this.productsService = productsService;
        this.providersService = providersService;
        this.authService = authService;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.checkAuth()) {
            if (route.params.id) {
                return (this.authService.checkUserCategory(['admin'])
                    || this.providersService
                        .getProvider(
                        this.productsService
                            .getProduct(route.params.id).providerId
                        ).users
                        .indexOf(
                        this.usersService.getCurrentUser()
                            .id
                        ) > -1
                );
            } else {
                return this.authService.checkUserCategory(['admin', 'provider']);
            }
        }
        return false;
    }
}
