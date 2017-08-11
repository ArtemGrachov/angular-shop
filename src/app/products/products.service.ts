import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../shared/models/product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        new Product(
            '0',
            'Apple',
            'http://juliandance.org/wp-content/uploads/2016/01/RedApple.jpg',
            'Sweet red apple!',
            '3',
            1.99,
            5,
            1,
            new Date(2017, 8, 9, 17, 24, 1, 1)
        ),
        new Product(
            '1',
            'Potato',
            'http://www.healthandbloom.com/img/potato-new.jpg',
            'Potato!',
            '4',
            2.99,
            5,
            2,
            new Date(2017, 8, 9, 17, 24, 1, 1)
        ),
        new Product(
            '2',
            'Honey',
            'http://www.magicvalleybeekeepers.org/wp-content/uploads/2016/03/honey2.jpeg',
            'Honey!',
            '1',
            0.99,
            10,
            0,
            new Date(2017, 8, 9, 17, 24, 1, 1)
        ),
        new Product(
            '3',
            'Carrot',
            'https://www.organicfacts.net/wp-content/uploads/2013/05/Carrot1.jpg',
            'Carrot description',
            '1',
            0.99,
            10,
            5,
            new Date(2017, 8, 9, 17, 24, 1, 1)
        ),
        new Product(
            '4',
            'Mineral water',
            'http://southsea.speedypizza.co.uk/image/cache/data/drinks/mineral330-500x500.jpg',
            'Water',
            '2',
            0.99,
            10,
            4,
            new Date(2017, 8, 9, 17, 24, 1, 1)
        )
    ];

    public emit: EventEmitter<any> = new EventEmitter();

    private cart: Product[] = [];

    getProducts(): Product[] {
        return this.products;
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

    addToCart(id: number) {
        if (this.getProduct(id).count > 0) {
            this.getProduct(id).count--;
            this.cart.push(this.getProduct(id));
            this.emit.emit(this.cart);
        }
    }

    removeFromCart(index: string) {
        this.cart[index].count++;
        this.cart.splice(+index, 1);
        this.emit.emit(this.cart);
    }

    clearCart() {
        while (this.cart.length > 0) {
            this.removeFromCart('0');
        }
        this.emit.emit(this.cart);
    }

    bookCart() {
        console.log('Ok!');
        this.cart = [];
        this.emit.emit(this.cart);
    }

    addProduct(newProduct: Product) {
        newProduct.id = this.products[this.products.length - 1].id + 1;
        this.products.push(newProduct);
    }

    updateProduct(updatedProduct: Product) {
        for (const i in this.products) {
            if (this.products[i].id === updatedProduct.id) {
                console.log(this.products[i]);
                this.products[i] = updatedProduct;
                return;
            }
        }
    }

    deleteProduct(id: string) {
        for (const index in this.products) {
            if (this.products[index].id === id) {
                this.products.splice(+index, 1);
            }
        }
    }

    rateProduct(id: number, rating: number) {
        this.getProduct(id).rating += rating;
    }
}
