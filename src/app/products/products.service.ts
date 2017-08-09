import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product.model';

@Injectable()
export class ProductsService {
    private Products: Product[] = [
        new Product(
            '0',
            'Apple',
            1,
            5,
            1,
            new Date(2017, 8, 9, 17, 24, 1, 1)
        ),
        new Product(
            '1',
            'Potato',
            2,
            5,
            2,
            new Date(2017, 8, 9, 17, 24, 1, 1)
        ),
        new Product(
            '2',
            'Onion',
            0,
            1,
            0,
            new Date(2017, 8, 9, 17, 24, 1, 1)
        ),
    ];

    private basket: Product[] = [];

    addToBasket() {
        console.log('added to basket');
    }

    deleteFromBasket() {
        console.log('deleted from basket');
    }

    setProductRating() {
        console.log('rating changed');
    }

    addProduct() {
        console.log('product added');
    }

    updatePRoduct() {
        console.log('product updated');
    }

    deleteProduct() {
        console.log('product deleted');
    }
}
