import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { ProductsService } from '../products.service';
import { ProvidersService } from '../../providers/providers.service';

import { UsersService } from '../../admin/users.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit, OnDestroy {
  productId: string;
  product: Product;
  isAuth: boolean = this.authService.checkAuth();
  prodSubsrc;
  authSubsrc;

  constructor(
    public productsService: ProductsService,
    public providersService: ProvidersService,
    public usersService: UsersService,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public location: Location
  ) { }

  checkUserCategory(categories: string[]) {
    return this.authService.checkUserCategory(categories);
  }

  checkEditAccess() {
    if (this.authService.checkAuth()) {
      return (this.authService.checkUserCategory(['admin'])
        || this.providersService
          .getProvider(
          this.product.providerId
          ).users
          .indexOf(
          this.usersService.getCurrentUser()
            .id
          ) > -1);
    }
    return false;
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.productId = params['id'];
        this.refreshProduct();
      }
    );

    this.prodSubsrc = this.productsService.emit.subscribe(
      () => this.refreshProduct()
    );

    this.authSubsrc = this.authService.emit.subscribe(
      () => this.isAuth = this.authService.checkAuth()
    );

    if (!this.product) {
      this.productsService.loadProducts();
    }
  }


  ngOnDestroy() {
    this.authSubsrc.unsubscribe();
    this.prodSubsrc.unsubscribe();
  }

  refreshProduct() {
    this.product = this.productsService.getProduct(this.productId);
  }

  addToCart(id: number) {
    this.productsService.addToCart(id);
  }

  rateProduct(id: string, rate: number) {
    this.productsService.rateProduct(id, rate);
  }

  getProviderName(id) {
    return this.providersService.getProvider(id).name;
  }

  goToPrevPage() {
    this.location.back();
  }

  delete() {
    this.productsService.deleteProduct(this.productId);
    this.router.navigate(['products']);
  }
}
