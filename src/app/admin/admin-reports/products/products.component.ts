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

  export(table) {
    const csv = Array.prototype.slice.call(table.querySelectorAll('tr')).map(
      row => {
        return Array.prototype.slice.call(row.querySelectorAll('td, th')).map(
          col => col.innerHTML
        ).join(',');
      }
    ).join('\n');
    this.saveCSV(csv);
  }

  saveCSV(csv) {
    console.log(csv);
    // is it right way in Angular?
    let csvFile = new Blob([csv], { type: 'text/csv' }),
      downloadLink = document.createElement('a');
    downloadLink.download = 'products.csv';
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
