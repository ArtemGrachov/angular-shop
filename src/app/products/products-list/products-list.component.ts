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
    this.productsService.addProduct(new Product(
      0,
      'Carrot',
      'https://www.organicfacts.net/wp-content/uploads/2013/05/Carrot1.jpg',
      'Special for rabbits',
      1.98,
      5,
      3,
      new Date(2017, 8, 9, 17, 24, 1, 1)
    ));
  }

  addToCart(id: number) {
    this.productsService.addToCart(id);
  }

  rateProduct(id: number, rate: number) {
    this.productsService.rateProduct(id, rate);
  }

}
