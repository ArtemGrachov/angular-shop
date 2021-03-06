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
    public authService: AuthService,
    private providersService: ProvidersService
  ) { }
  public products: Product[] = [];
  public filter = { sort: 'rating', reverse: true, search: '' };
  public preloader: boolean = true;

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
      res => this.products = res,
      err => this.preloader = false,
      () => this.preloader = false
    );
  }
}
