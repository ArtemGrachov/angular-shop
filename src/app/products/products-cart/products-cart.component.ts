import { Component, OnInit } from '@angular/core';

import { Product } from '../../shared/models/product.model';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.css']
})
export class ProductsCartComponent implements OnInit {
  cart: Product[] = [];
  price = 0;
  constructor(public productsService: ProductsService) { }


  ngOnInit() {
    this.cart = this.productsService.getCart();
    this.price = this.calcTotalPrice();
    this.productsService.emit.subscribe(
      () => {
        this.refreshCart();
      }
    );
  }

  removeFromCart(index: string) {
    this.productsService.removeFromCart(index);
  }

  clearCart() {
    this.productsService.clearCart();
  }

  refreshCart() {
    this.cart = this.productsService.getCart();
    this.price = this.calcTotalPrice();
  }

  calcTotalPrice() {
    let price = 0;
    for (const product of this.cart) {
      price += product.price;
    }
    return +price.toFixed(2);
  }

}
