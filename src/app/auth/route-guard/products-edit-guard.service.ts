import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { EditAccessService } from '../../shared/edit-access.service';

import { ProductsService } from '../../products/products.service';
import { ProvidersService } from '../../providers/providers.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductsEditGuard implements CanActivate {
    constructor(
        public authService: AuthService,
        public productsService: ProductsService,
        public providersService: ProvidersService,
        public editAccessService: EditAccessService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.editAccessService.productEditAccess(route.params.id);
    }
}
