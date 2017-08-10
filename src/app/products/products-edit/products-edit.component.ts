import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProductsService } from '../products.service';
import { ProvidersService } from '../../providers/providers.service';

import { Product } from '../../shared/models/product.model';
import { Provider } from '../../shared/models/provider.model';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  public product: Product;
  public productId: String;
  public providersList: Provider[];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public productsService: ProductsService,
    public providersService: ProvidersService
  ) { }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.productId = params['id'];
        this.product = this.productsService.getProduct(this.productId);
      }
    );
    this.providersList = this.providersService.getProviders();
  }
}
