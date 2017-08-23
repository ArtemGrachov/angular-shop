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
                this.authService.loadCurrentUser().subscribe(
                    (user: any) => {
                        if (user) {
                            if (user.category === 'admin') {
                                observer.next(true);
                            } else if (user.category === 'provider') {
                                this.productsService.loadProduct(id).subscribe(
                                    res => {
                                        this.providersService.loadProvider(res.providerId).subscribe(
                                            prov => {
                                                if (prov.users.indexOf(user.id) > -1) {
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
                        } else {
                            observer.next(false);
                        }
                    }
                );
            }
        );
    }

    newsEditAccess(id: string) {
        return new Observable(
            observer => {
                this.authService.loadCurrentUser().subscribe(
                    (user: any) => {
                        if (user) {
                            if (user.category === 'admin') {
                                observer.next(true);
                            } else {
                                this.newsService.loadPost(id).subscribe(
                                    res => {
                                        if (res.authorId === user.id) {
                                            observer.next(true);
                                        } else {
                                            observer.next(false);
                                        }
                                    }
                                );
                            }
                        } else {
                            observer.next(false);
                        }
                    }
                );
            }
        );
    }

    providerEditAccess(id: string) {
        return new Observable(
            observer => {
                this.authService.loadCurrentUser().subscribe(
                    (user: any) => {
                        if (user) {
                            if (user.category === 'admin') {
                                observer.next(true);
                            } else if (user.category === 'provider') {
                                this.providersService.loadProvider(id).subscribe(
                                    prov => {
                                        if (prov.users.indexOf(user.id) > -1) {
                                            observer.next(true);
                                        } else {
                                            observer.next(false);
                                        }
                                    }
                                );
                            } else {
                                observer.next(false);
                            }
                        } else {
                            observer.next(false);
                        }
                    }
                );
            }
        );
    }
}
