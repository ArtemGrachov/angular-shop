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
    public productsService: ProductsService,
    private authService: AuthService
  ) { }
  public discount: boolean;

  cart;

  ngOnInit() {
    this.cart = this.productsService.getCart();
    const user = this.authService.getCurrentUser();
    if (user.category === 'premium') {
      this.discount = true;
    }
  }

  removeFromCart(index: string) {
    this.productsService.removeFromCart(index);
  }

  clearCart() {
    this.productsService.clearCart();
  }

}
