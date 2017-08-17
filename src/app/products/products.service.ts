import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import { UsersService } from '../admin/users.service';

import { Product } from '../shared/models/product.model';

@Injectable()
export class ProductsService {
    constructor(
        public usersService: UsersService,
        public http: Http
    ) { }

    products: Product[] = [];

    emit: EventEmitter<any> = new EventEmitter();

    cart: Product[] = this.loadCart();

    loadProducts() {
        this.http.get('https://angular-shop-e7657.firebaseio.com/products.json')
            .subscribe(
            (res: Response) => {
                let resJson = res.json(),
                    newProductsList = [];
                for (let i in resJson) {
                    newProductsList.push(resJson[i]);
                }
                this.products = newProductsList;
                this.emit.emit();
            });
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
        this.http.put(`https://angular-shop-e7657.firebaseio.com/products/${newProduct.id}.json`, newProduct).subscribe();
        this.loadProducts();
        this.emit.emit();
    }

    updateProduct(updatedProduct: Product) {
        this.http.put(`https://angular-shop-e7657.firebaseio.com/products/${updatedProduct.id}.json`, updatedProduct).subscribe();
        this.loadProducts();
        this.emit.emit();
    }

    deleteProduct(id: string) {
        this.http.delete(`https://angular-shop-e7657.firebaseio.com/products/${id}.json`).subscribe();
        this.loadProducts();
        this.emit.emit();
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
