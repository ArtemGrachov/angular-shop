import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

import { Product } from '../../shared/models/product.model';

import { ProductsService } from '../products.service';
import { ProvidersService } from '../../providers/providers.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private providersService: ProvidersService
  ) { }
  private products: Product[] = [];
  private addAccess = this.authService.checkUserCategory(['admin', 'provider']);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.loadProducts().subscribe(
      res => {
        this.products = res;
      }
    );
  }
}
