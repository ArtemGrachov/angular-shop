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
  cart;

  constructor(
    public productsService: ProductsService,
    public authService: AuthService
  ) { }

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
