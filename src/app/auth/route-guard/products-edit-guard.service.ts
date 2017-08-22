import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

import { ProductsService } from '../../products/products.service';
import { ProvidersService } from '../../providers/providers.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductsEditGuard implements CanActivate {
    constructor(
        public authService: AuthService,
        public productsService: ProductsService,
        public providersService: ProvidersService
    ) { }
    private obs: Observable<boolean>;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.obs = new Observable(
            observer => {
                this.authService.getCurrentUser().subscribe(
                    (user: any) => {
                        if (user.category === 'admin') {
                            observer.next(true);
                        } else if (user.category === 'provider') {
                            this.productsService.loadProduct(route.params.id).subscribe(
                                res => {
                                    this.providersService.loadProvider(res.providerId).subscribe(
                                        prov => {
                                            if (prov.users.indexOf(this.authService.getUid()) > -1) {
                                                observer.next(true);
                                            } else {
                                                observer.next(false);
                                            }
                                        }
                                    );
                                }
                            );
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
