import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProvidersService } from '../../providers.service';
import { ProductsService } from '../../../products/products.service';

import { Provider } from '../../../shared/models/provider.model';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  providerId: string;

  constructor(
    private providersService: ProvidersService,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.providerId = this.route.snapshot.parent.params['id'];
        this.loadProducts();
      }
    );
  }

  loadProducts() {
    this.productsService.getProductsByProvider(this.providerId).subscribe(
      res => this.products = res
    );
  }

}
