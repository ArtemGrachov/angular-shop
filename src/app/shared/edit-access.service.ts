import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';

import { NewsService } from '../news/news.service';
import { ProductsService } from '../products/products.service';
import { ProvidersService } from '../providers/providers.service';

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
                const user = this.authService._currentUser;
                if (user) {
                    if (user.category === 'admin') {
                        observer.next(true);
                        observer.complete();
                    } else if (user.category === 'provider') {
                        this.productsService.loadProduct(id).subscribe(
                            res => {
                                this.providersService.loadProvider(res.providerId).subscribe(
                                    prov => {
                                        if (prov.users && prov.users.indexOf(user.id) > -1) {
                                            observer.next(true);
                                        } else {
                                            observer.next(false);
                                        }
                                        observer.complete();
                                    }
                                );
                            }
                        );
                    } else {
                        observer.next(false);
                        observer.complete();
                    }
                } else {
                    observer.next(false);
                    observer.complete();
                }
            }
        );
    }

    newsEditAccess(id: string) {
        return new Observable(
            observer => {
                const user = this.authService._currentUser;
                if (user) {
                    if (user.category === 'admin') {
                        observer.next(true);
                        observer.complete();
                    } else {
                        this.newsService.loadPost(id).subscribe(
                            res => {
                                if (res.authorId === user.id) {
                                    observer.next(true);
                                } else {
                                    observer.next(false);
                                }
                                observer.complete();
                            }
                        );
                    }
                } else {
                    observer.next(false);
                    observer.complete();
                }
            }
        );
    }

    providerEditAccess(id: string) {
        return new Observable(
            observer => {
                const user = this.authService._currentUser;
                if (user) {
                    if (user.category === 'admin') {
                        observer.next(true);
                        observer.complete();
                    } else if (user.category === 'provider') {
                        this.providersService.loadProvider(id).subscribe(
                            prov => {
                                if (prov.users && prov.users.indexOf(user.id) > -1) {
                                    observer.next(true);
                                } else {
                                    observer.next(false);
                                }
                                observer.complete();
                            }
                        );
                    } else {
                        observer.next(false);
                        observer.complete();
                    }
                } else {
                    observer.next(false);
                    observer.complete();
                }
            }
        );
    }
}
