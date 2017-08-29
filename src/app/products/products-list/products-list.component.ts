import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { ProductsService } from '../products.service';
import { ProvidersService } from '../../providers/providers.service';

import { Product } from '../../shared/models/product.model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private providersService: ProvidersService
  ) { }
  public products: Product[] = [];
  public addAccess: boolean = false;
  public filter = { sort: 'rating', reverse: true, search: '' };
  public preloader: boolean = true;

  private productLoader = this.productsService.loadProducts().map(
    res => this.products = res
  );
  private accessCheck = this.authService.checkUserCategory(['admin', 'provider']).map(
    (res: any) => this.addAccess = res
  );

  public loader = Observable.forkJoin(
    this.productLoader,
    this.accessCheck
  ).map(
    res => this.preloader = false
    );

  ngOnInit() {
    this.loader.subscribe();
    this.productsService.searchEmit.subscribe(
      filter => {
        this.filter = filter;
      }
    );
  }
}
