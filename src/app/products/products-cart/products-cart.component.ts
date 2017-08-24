import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { ProductsService } from '../products.service';

import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html'
})
export class ProductsCartComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private authService: AuthService
  ) { }

  cart;

  ngOnInit() {
    this.cart = this.productsService.getCart();
  }

  removeFromCart(index: string) {
    this.productsService.removeFromCart(index);
  }

  clearCart() {
    this.productsService.clearCart();
  }
}
