import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProvidersService } from '../providers.service';
import { ProductsService } from '../../products/products.service';

import { Provider } from '../../shared/models/provider.model';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-providers-details',
  templateUrl: './providers-details.component.html',
  styleUrls: ['./providers-details.component.css']
})
export class ProvidersDetailsComponent implements OnInit {
  providerId: string = '';
  provider: Provider;
  providerProducts: Product[];
  constructor(
    public providersService: ProvidersService,
    public productsService: ProductsService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.providerId = params['id'];
        this.provider = this.providersService.getProvider(this.providerId);
        this.providerProducts = this.productsService.getProductsByProvider(this.providerId);
      }
    );
  }

  delete() {
    this.providersService.deleteProvider(this.providerId);
    this.router.navigate(['providers']);
  }

  providerRate(rate: number) {
    this.providersService.rateProvider(this.providerId, rate);
  }
}
