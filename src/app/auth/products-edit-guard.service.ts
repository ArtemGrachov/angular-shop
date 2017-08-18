import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UsersService } from '../admin/users.service';
import { ProductsService } from '../products/products.service';
import { ProvidersService } from '../providers/providers.service';
import { AuthService } from './auth.service';

@Injectable()
export class ProductsEditGuard implements CanActivate {
    constructor(
        public usersService: UsersService,
        public productsService: ProductsService,
        public providersService: ProvidersService,
        public authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (this.authService.checkAuth()) {
        //     if (route.params.id) {
        //         return (this.authService.checkUserCategory(['admin'])
        //             || this.providersService
        //                 .getProvider(
        //                 this.productsService
        //                     .getProduct(route.params.id).providerId
        //                 ).users
        //                 .indexOf(
        //                 this.usersService.getCurrentUser()
        //                     .id
        //                 ) > -1
        //         );
        //     } else {
        //         return this.authService.checkUserCategory(['admin', 'provider']);
        //     }
        // }
        return true;
    }
}
