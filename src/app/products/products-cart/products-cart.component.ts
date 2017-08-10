import { Component, OnInit } from '@angular/core';

import { Product } from '../../shared/models/product.model';

import { ProductsService } from '../products.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.css']
})
export class ProductsCartComponent implements OnInit {
  cart: Product[] = [];
  price = 0;
  constructor(public productsService: ProductsService) { }

  obs: Observable<Product[]>;

  ngOnInit() {
    this.cart = this.productsService.getCart();
    this.productsService.emit.subscribe(
      (cart) => {
        this.refreshCart(cart);
      }
    );
  }

  removeFromCart(index: string) {
    this.productsService.removeFromCart(index);
  }

  clearCart() {
    this.productsService.clearCart();
  }

  bookCart() {
    this.productsService.bookCart();
  }

  refreshCart(cart) {
    this.cart = cart;
    this.price = this.calcTotalPrice(cart);
  }

  calcTotalPrice(cart: Product[]) {
    let price = 0;
    for (const product of cart) {
      price += product.price;
    }
    return +price.toFixed(2);
  }

}
