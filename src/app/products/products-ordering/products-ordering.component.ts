import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-ordering',
  templateUrl: './products-ordering.component.html',
  styleUrls: ['./products-ordering.component.css']
})
export class ProductsOrderingComponent implements OnInit {
  cart: Product[] = [];
  price = 0;

  constructor(
    public productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.cart = this.productsService.getCart();
    this.price = this.calcTotalPrice();
    this.productsService.emit.subscribe(
      (cart) => {
        this.price = this.calcTotalPrice();
      }
    );
  }

  calcTotalPrice() {
    let price = 0;
    for (const product of this.cart) {
      price += product.price;
    }
    return +price.toFixed(2);
  }

  removeFromCart(index: string) {
    this.productsService.removeFromCart(index);
  }

  // refreshCart(cart) {
  //   this.cart = cart;
  //   this.price = this.calcTotalPrice();
  // }
}
