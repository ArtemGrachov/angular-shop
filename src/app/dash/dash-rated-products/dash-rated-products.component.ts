import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../admin/users.service';
import { ProductsService } from '../../products/products.service';

import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-dash-rated-products',
  templateUrl: './dash-rated-products.component.html',
  styleUrls: ['./dash-rated-products.component.css']
})
export class DashRatedProductsComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    public productsService: ProductsService
  ) { }

  products: Product[] = [];

  ngOnInit() {
    this.usersService.getCurrentUser().ratedProducts.map(
      (id) => {
        this.products.push(
          this.productsService.getProduct(id)
        );
      }
    );
  }

}
