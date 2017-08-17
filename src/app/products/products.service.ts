import { Injectable, EventEmitter } from '@angular/core';

import { UsersService } from '../admin/users.service';

import { Product } from '../shared/models/product.model';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ProductsService {
    constructor(
        public usersService: UsersService,
        public db: AngularFireDatabase
    ) { }

    products: Product[] = [];

    emit: EventEmitter<any> = new EventEmitter();

    cart: Product[] = this.loadCart();

    loadProducts() {
        this.db.list('/products').subscribe(
            res => {
                console.log(res);
                this.products = res;
                this.emit.emit();
            }
        );
    }

    getProducts(): Product[] {
        return this.products.slice();
    }

    getProductsByProvider(providerId): Product[] {
        let products: Product[] = [];
        for (const product of this.products) {
            if (product.providerId === providerId) {
                products.push(product);
            }
        }
        return products;
    }

    getProduct(id): Product {
        return this.products.find(
            (product) => product.id === id
        );
    }

    getCart(): Product[] {
        return this.cart.slice();
    }

    getLatest(count: number): Product[] {
        const sortedProducts: Product[] = this.products.slice().sort(
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
        return sortedProducts.slice(0, count);
    }

    getCount(): number {
        return this.products.length;
    }

    addToCart(id: number) {
        if (this.getProduct(id).count > 0) {
            this.getProduct(id).count--;
            this.cart.push(this.getProduct(id));
            this.updateLocalStorageCart();
            this.emit.emit();
        }
    }

    removeFromCart(index: string) {
        this.cart[index].count++;
        this.cart.splice(+index, 1);
        this.updateLocalStorageCart();
        this.emit.emit();
    }

    updateLocalStorageCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    loadCart() {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
        return [];
    }

    clearCart() {
        while (this.cart.length > 0) {
            this.removeFromCart('0');
        }
        this.emit.emit();
    }

    bookCart() {
        this.cart = [];
        this.updateLocalStorageCart();
        this.emit.emit();
    }

    addProduct(newProduct: Product) {
        newProduct.id = (new Date).getTime().toString();
        this.db.list('/products').set(newProduct.id, newProduct);
        this.loadProducts();
    }

    updateProduct(updatedProduct: Product) {
        this.db.list('/products').set(updatedProduct.id, updatedProduct);
        this.loadProducts();
    }

    deleteProduct(id: string) {
        this.db.list('/products/' + id).remove();
        this.loadProducts();
    }

    rateProduct(id: string, rating: number) {
        if (this.usersService.getCurrentUser().ratedProducts.indexOf(id) < 0) {
            this.usersService.getCurrentUser().ratedProducts.push(id);
            this.getProduct(id).rating += rating;
            this.emit.emit();
        }
    }

    sendOrder(val: any) {
        this.cart = [];
        console.log(arguments, this.cart);
        this.emit.emit();
    }
}
