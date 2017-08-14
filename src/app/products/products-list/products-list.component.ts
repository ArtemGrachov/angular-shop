import { Component, OnInit } from '@angular/core';

import { Product } from '../../shared/models/product.model';

import { ProductsService } from '../products.service';
import { ProvidersService } from '../../providers/providers.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public products: Product[] = [];

  constructor(
    public productsService: ProductsService,
    public providersService: ProvidersService
  ) { }

  ngOnInit() {
    this.refreshProducts();
    this.productsService.emit.subscribe(
      () => this.refreshProducts()
    );
  }

  refreshProducts() {
    this.products = this.productsService.getProducts();
  }

}
