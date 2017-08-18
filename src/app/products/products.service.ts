import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { DataService } from '../shared/data.service';
import { UsersService } from '../admin/users.service';

import { Product } from '../shared/models/product.model';

@Injectable()
export class ProductsService {
    constructor(
        public dataService: DataService,
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
        return this.dataService.putData('products', newProduct);
    }

    updateProduct(updatedProduct: Product) {
        return this.dataService.putData('products', updatedProduct);
    }

    deleteProduct(id: string) {
        return this.dataService.deleteData('products/' + id);
    }

    rateProduct(id: string, rate: number) {
        return this.loadProduct(id).map(
            product => {
                product.rating += rate;
                return this.updateProduct(product);
            }
        );
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
            newPrise += product.price;
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
    }

    ///// !!!!!!
    bookCart() {
        this.cart.list = [];
        this.updateCart();
    }

    sendOrder(val: any) {
        this.cart.list = [];
        console.log(arguments, this.cart);
    }
}
