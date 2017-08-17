import { Component, OnInit } from '@angular/core';

import { Product } from '../../shared/models/product.model';

import { ProductsService } from '../products.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.css']
})
export class ProductsCartComponent implements OnInit {
  cart: Product[] = [];
  price = 0;
  discount = {
    available: false,
    discountPrice: 0
  };

  constructor(
    public productsService: ProductsService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.refreshCart();
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
    if (this.authService.checkUserCategory(['premium'])) {
      this.discount.discountPrice = this.calcDiscount();
      this.discount.available = true;
    }
  }

  calcTotalPrice() {
    let price = 0;
    for (const product of this.cart) {
      price += product.price;
    }
    return +price.toFixed(2);
  }

  calcDiscount() {
    return +(this.price * 0.97).toFixed(2);
  }
}
