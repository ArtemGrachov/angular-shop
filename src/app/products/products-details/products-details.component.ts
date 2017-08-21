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
  constructor(
    public productsService: ProductsService,
    public providersService: ProvidersService,
    public usersService: UsersService,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public location: Location
  ) { }

  productId: string;
  product: Product;
  // providerName: string;
  isAuth: boolean = this.authService.checkAuth();
  authSubsrc;

  providerName;

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
      res => {
        this.product = res;
        this.providerName = this.providersService.loadProvider(this.product.providerId).map(
          provider => provider.name
        );
      }
    );
  }

  ngOnDestroy() {
    this.authSubsrc.unsubscribe();
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
