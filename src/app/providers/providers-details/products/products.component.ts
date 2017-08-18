import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProvidersService } from '../../providers.service';
import { ProductsService } from '../../../products/products.service';

import { Provider } from '../../../shared/models/provider.model';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    public providersService: ProvidersService,
    public productsService: ProductsService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        // this.products = this.productsService.getProductsByProvider(this.route.snapshot.parent.params['id']);
      }
    );
  }

}
