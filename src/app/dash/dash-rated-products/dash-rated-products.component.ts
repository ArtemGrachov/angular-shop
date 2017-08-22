import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { ProductsService } from '../../products/products.service';

import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-dash-rated-products',
  templateUrl: './dash-rated-products.component.html',
  styleUrls: ['./dash-rated-products.component.css']
})
export class DashRatedProductsComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public productsService: ProductsService
  ) { }

  products: Product[] = [];

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(
      obs => obs.subscribe(
        res => {
          if (res.ratedProducts) {
            for (let id of res.ratedProducts) {
              this.productsService.loadProduct(id).subscribe(
                product => this.products.push(product)
              );
            }
          }
        }
      )
    );
  }

}
