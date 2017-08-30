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
  public preloader: string[] = ['user', 'products'];

  ngOnInit() {
    this.authService.loadCurrentUser().subscribe(
      (res: any) => {
        if (res.ratedProducts) {
          for (let id of res.ratedProducts) {
            this.productsService.loadProduct(id).subscribe(
              product => {
                this.products.push(product);
                this.preloader = this.preloader.filter(str => str !== 'products');
              }
            );
          }
        } else {
          this.preloader = this.preloader.filter(str => str !== 'products');
        }
      },
      err => { },
      () => this.preloader = this.preloader.filter(str => str !== 'user')
    );
  }
}
