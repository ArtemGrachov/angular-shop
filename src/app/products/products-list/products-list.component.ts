import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

import { Product } from '../../shared/models/product.model';

import { ProductsService } from '../products.service';
import { ProvidersService } from '../../providers/providers.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  public products: Product[] = [];
  prodSubscr;

  constructor(
    public productsService: ProductsService,
    public authService: AuthService,
    public providersService: ProvidersService
  ) { }

  ngOnInit() {
    this.refreshProducts();
    this.productsService.loadProducts();
    this.prodSubscr = this.productsService.emit.subscribe(
      () => this.refreshProducts()
    );
  }

  ngOnDestroy() {
    this.prodSubscr.unsubscribe();
  }

  checkUserCategory(categories: string[]) {
    return this.authService.checkUserCategory(categories);
  }

  refreshProducts() {
    this.products = this.productsService.getProducts();
  }
}
