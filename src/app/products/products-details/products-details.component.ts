import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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
  productId: string;
  product: Product;

  constructor(
    public productsService: ProductsService,
    public providersService: ProvidersService,
    public router: Router,
    public route: ActivatedRoute,
    public location: Location
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

  goToPrevPage() {
    this.location.back();
  }

  delete() {
    this.productsService.deleteProduct(this.productId);
    this.router.navigate(['products']);
  }

}
