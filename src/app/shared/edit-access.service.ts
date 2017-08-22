import { Injectable } from '@angular/core';

import { NewsService } from '../news/news.service';
import { ProductsService } from '../products/products.service';
import { ProvidersService } from '../providers/providers.service';
import { AuthService } from '../auth/auth.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class EditAccessService {
    constructor(
        private authService: AuthService,
        private productsService: ProductsService,
        private providersService: ProvidersService,
        private newsService: NewsService
    ) { }


    productEditAccess(id: string) {
        return new Observable(
            observer => {
                this.authService.getCurrentUser().subscribe(
                    (user: any) => {
                        if (user.category === 'admin') {
                            observer.next(true);
                        } else if (user.category === 'provider') {
                            this.productsService.loadProduct(id).subscribe(
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
    }
}
