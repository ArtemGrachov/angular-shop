import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { Product } from '../../shared/models/product.model';

import { ProductsService } from '../products.service';
import { ProvidersService } from '../../providers/providers.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  productId: String;
  product: Product;

  constructor(
    public productsService: ProductsService,
    public providersService: ProvidersService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.productId = params['id'];
        this.product = this.productsService.getProduct(this.productId);
      }
    );
  }




  addToCart(id: number) {
    this.productsService.addToCart(id);
  }

  rateProduct(id: number, rate: number) {
    this.productsService.rateProduct(id, rate);
  }

  getProviderName(id) {
    return this.providersService.getProvider(id).name;
  }

}
