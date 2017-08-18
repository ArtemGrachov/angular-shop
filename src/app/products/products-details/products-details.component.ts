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
    // if (this.authService.checkAuth()) {
    //   return (this.authService.checkUserCategory(['admin'])
    //     || this.providersService
    //       .getProvider(
    //       this.product.providerId
    //       ).users
    //       .indexOf(
    //       this.usersService.getCurrentUser()
    //         .id
    //       ) > -1);
    // }
    return true;
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.productId = params['id'];
        this.loadProduct();
      }
    );
    this.authSubsrc = this.authService.emit.subscribe(
      () => this.isAuth = this.authService.checkAuth()
    );
  }

  loadProduct() {
    this.productsService.loadProduct(this.productId).subscribe(
      res => this.product = res
    );
  }

  ngOnDestroy() {
    this.authSubsrc.unsubscribe();
  }

  addToCart(product: Product) {
    this.productsService.addToCart(product);
  }

  rateProduct(id: string, rate: number) {
    this.productsService.rateProduct(id, rate);
  }

  getProviderName(id) {
    if (this.providersService.getProvider(id)) {
      return this.providersService.getProvider(id).name;
    }
    return 'Angular Shop';
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
