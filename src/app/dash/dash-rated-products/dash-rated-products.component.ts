import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { ProductsService } from '../../products/products.service';

import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-dash-rated-products',
  templateUrl: './dash-rated-products.component.html'
})
export class DashRatedProductsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private productsService: ProductsService
  ) { }

  public products: Product[] = [];
  public preloader: boolean = true;

  ngOnInit() {
    const user = this.authService._currentUser;
    if (user.ratedProducts) {
      user.ratedProducts.forEach(
        (id, index) => {
          this.productsService.loadProduct(id).subscribe(
            product => this.products.push(product),
            err => this.preloader = false,
            () => { if (index === user.ratedProducts.length - 1) { this.preloader = false; } }
          );
        }
      );
    } else {
      this.preloader = false;
    }
  }
}
