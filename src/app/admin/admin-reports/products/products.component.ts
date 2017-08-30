import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../products/products.service';
import { ProvidersService } from '../../../providers/providers.service';

import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private providersService: ProvidersService
  ) { }
  public preloader: string[] = ['products', 'providers'];
  public products: Product[] = [];

  ngOnInit() {
    this.productsService.loadProducts().subscribe(
      res => {
        this.products = res;
        this.preloader = this.preloader.filter(str => str !== 'products');
        this.products.forEach(
          (product, index) => {
            this.providersService.loadProvider(product.providerId).subscribe(
              provider => {
                product.providerName = provider.name;
                if (index === this.products.length - 1) {
                  this.preloader = this.preloader.filter(str => str !== 'providers');
                }
              }
            );
          }
        );
      }
    );
  }
}
