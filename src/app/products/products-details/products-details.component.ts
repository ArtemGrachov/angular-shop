import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { ProductsService } from '../products.service';
import { ProvidersService } from '../../providers/providers.service';

import { EditAccessService } from '../../shared/edit-access.service';

import { UsersService } from '../../admin/users.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private providersService: ProvidersService,
    private usersService: UsersService,
    private editAccessService: EditAccessService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  productId: string;
  product: Product;
  providerName;
  auth = this.authService.getAuth();
  editAccess;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.productId = params['id'];
        this.loadProduct();
        this.editAccess = this.editAccessService.productEditAccess(this.productId);
      }
    );
  }

  loadProduct() {
    this.productsService.loadProduct(this.productId).subscribe(
      res => {
        this.product = res;
        this.providerName = this.providersService.loadProvider(this.product.providerId).map(
          provider => provider.name
        );
      }
    );
  }

  addToCart(product: Product) {
    this.productsService.loadProduct(this.productId).subscribe(
      res => {
        if (res.count <= 0) {
          alert('no products!');
        } else {
          this.productsService.addToCart(product);
        }
        this.product = res;
      }
    );
  }

  rateProduct(id: string, rate: number) {
    this.productsService.rateProduct(id, rate).subscribe(
      updater => {
        updater.subscribe(
          () => this.loadProduct()
        );
      }
    );
  }

  goToPrevPage() {
    this.location.back();
  }

  delete() {
    this.productsService.deleteProduct(this.productId).subscribe(
      () => this.router.navigate(['products'])

    );
  }
}
