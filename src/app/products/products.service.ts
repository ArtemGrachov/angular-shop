import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { AlertsService } from '../alerts/alerts.service';

import { DataService } from '../shared/data.service';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../admin/users.service';

import { Product } from '../shared/models/product.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductsService {
    constructor(
        public dataService: DataService,
        public alertsService: AlertsService,
        public authService: AuthService,
        public usersService: UsersService
    ) { }

    products: Product[] = [];

    cart = {
        list: [],
        price: 0
    };

    loadProducts() {
        return this.dataService.loadDataList('products');
    }

    getProductsByProvider(providerId) {
        return this.loadProducts().map(
            res => {
                let products: Product[] = [];
                for (const product of res) {
                    if (product.providerId === providerId) {
                        products.push(product);
                    }
                }
                return products;
            }
        );
    }

    loadProduct(id: string) {
        return this.dataService.loadDataObj(`products/${id}`);
    }

    getLatest(count: number) {
        return this.loadProducts().map(
            res => {
                res.sort(
                    function (a, b) {
                        if (a.date < b.date) {
                            return 1;
                        } else if (a.date > b.date) {
                            return - 1;
                        } else {
                            return 0;
                        }
                    }
                );
                return res.slice(0, count);
            }
        );
    }

    getCount() {
        return this.loadProducts().map(
            res => res.length
        );
    }

    addProduct(newProduct: Product) {
        newProduct.id = (new Date).getTime().toString();
        return this.dataService.putData('products', newProduct).map(
            () => this.alertsService.addAlert({ message: 'Product added', type: 'success' })
        );
    }

    updateProduct(updatedProduct: Product) {
        return this.dataService.putData('products', updatedProduct).map(
            () => this.alertsService.addAlert({ message: 'Product updated', type: 'info' })
        );
    }

    deleteProduct(id: string) {
        return this.dataService.deleteData('products/' + id).map(
            () => this.alertsService.addAlert({ message: 'Product deleted', type: 'danger' })
        );
    }

    rateProduct(id: string, rate: number) {
        let obs = new Observable(
            observer => {
                this.usersService.rateItem(id, 'ratedProducts').subscribe(
                    res => {
                        if (res) {
                            this.loadProduct(id).subscribe(
                                product => {
                                    product.rating += rate;
                                    this.dataService.putObjValue(`products/${product.id}/rating`, product.rating).subscribe(
                                        res => observer.next(true)
                                    );
                                }
                            );
                        } else {
                            observer.next(false);
                            observer.complete();
                        }
                    }
                );
            }
        );
        return obs;
    }

    getCart() {
        this.loadCart();
        this.calcPrice();
        return this.cart;
    }

    addToCart(product: Product) {
        this.cart.list.push(product);
        this.updateCart();
    }

    removeFromCart(index: string) {
        this.cart.list.splice(+index, 1);
        this.updateCart();
    }

    updateCart() {
        this.calcPrice();
        localStorage.setItem('cart', JSON.stringify(
            this.cart.list.map(
                (product) => product.id
            )
        ));
    }

    calcPrice() {
        let newPrise = 0;
        for (const product of this.cart.list) {
            if (product.count > 0) {
                newPrise += product.price;
            }
        }
        this.cart.price = +newPrise.toFixed(2);
    }

    loadCart() {
        const idList = JSON.parse(localStorage.getItem('cart'));
        if (idList) {
            let updatedList = [];
            for (let id of idList) {
                this.loadProduct(id).subscribe(
                    res => {
                        updatedList.push(res);
                        if (updatedList.length === idList.length) {
                            this.calcPrice();
                        }
                    }
                );
            }
            this.cart.list = updatedList;
            return JSON.parse(localStorage.getItem('cart'));
        }
    }

    clearCart() {
        localStorage.removeItem('cart');
        this.cart.list = [];
        this.calcPrice();
        this.alertsService.addAlert({ message: 'Product cart cleared', type: 'warning' });
    }

    clearCartOrder() {
        this.cart.list = this.cart.list.filter(
            (product) => product.count <= 0
        );
    }
}
