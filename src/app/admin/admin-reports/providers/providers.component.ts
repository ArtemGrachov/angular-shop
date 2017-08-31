import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../../providers/providers.service';
import { ProductsService } from '../../../products/products.service';

import { DataService } from '../../../shared/data.service';

import { Provider } from '../../../shared/models/provider.model';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html'
})
export class ProvidersComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private providersService: ProvidersService,
    private dataService: DataService
  ) { }
  public preloader: string[] = ['providers', 'products'];
  public providers: Provider[] = [];

  ngOnInit() {
    this.providersService.loadProviders().subscribe(
      res => {
        this.providers = res;
        this.preloader = this.preloader.filter(str => str !== 'providers');
        this.providers.forEach(
          (provider, index) => {
            this.productsService.getProductsByProvider(provider.id).subscribe(
              products => {
                provider.productsCount = products.length;
                if (index === this.providers.length - 1) {
                  this.preloader = this.preloader.filter(str => str !== 'products');
                }
              }
            );
          }
        );
      }
    );
  }

  toCSV(table) {
    this.dataService.saveCSV(table, 'providers');
  }
}
