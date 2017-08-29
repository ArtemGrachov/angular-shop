import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { ProductsService } from '../products.service';
import { ProvidersService } from '../../providers/providers.service';

import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private providersService: ProvidersService
  ) { }
  public products: Product[] = [];
  public addAccess = this.authService.checkUserCategory(['admin', 'provider']).map(
    res => {
      this.preloader = this.preloader.filter(str => str !== 'access');
      return res;
    }
  );
  public filter = { sort: 'rating', reverse: true, search: '' };
  public preloader: string[] = ['access', 'products'];

  ngOnInit() {
    this.loadProducts();
    this.productsService.searchEmit.subscribe(
      filter => {
        this.filter = filter;
      }
    );
  }

  loadProducts() {
    this.productsService.loadProducts().subscribe(
      res => {
        this.preloader = this.preloader.filter(str => str !== 'products');
        this.products = res;
      }
    );
  }
}
