import { Component, OnInit } from '@angular/core';

import { Product } from '../../shared/models/product.model';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public products: Product[] = [];

  constructor(public productsService: ProductsService) { }

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

  addToCart(id: number) {
    this.productsService.addToCart(id);
  }

  rateProduct(id: number, rate: number) {
    this.productsService.rateProduct(id, rate);
  }

  getProviderName(id) {
    return 'test';
  }

}
