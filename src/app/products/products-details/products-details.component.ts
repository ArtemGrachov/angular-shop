import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { EditAccessService } from '../../shared/edit-access.service';
import { ProductsService } from '../products.service';
import { ProvidersService } from '../../providers/providers.service';
import { UsersService } from '../../admin/users.service';

import { Product } from '../../shared/models/product.model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html'
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

  public productId: string;
  public product: Product;
  public auth = this.authService.getAuth();
  public editAccess: boolean = false;
  public preloader: boolean = true;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.productId = params['id'];
        this.loadProduct();
      }
    );
  }

  loadProduct() {
    Observable.forkJoin(
      this.productsService.loadProduct(this.productId),
      this.editAccessService.productEditAccess(this.productId)
    ).subscribe(
      (res: any) => {
        this.product = res[0];
        this.editAccess = res[1];
        this.providersService.loadProvider(this.product.providerId).subscribe(
          provider => {
            this.product.providerName = provider.name;
            this.preloader = false;
          },
          err => this.preloader = false
        );
      });
  }

  addToCart(product: Product) {
    this.productsService.loadProduct(this.productId).subscribe(
      res => {
        if (res.count <= 0) {
          alert('no products!'); /// ????
        } else {
          this.productsService.addToCart(product);
        }
        this.product = res;
      }
    );
  }

  rateProduct(id: string, rate: number) {
    this.productsService.rateProduct(id, rate).subscribe(
      res => {
        if (res) {
          this.loadProduct();
        }
      }
    );
  }

  delete() {
    this.productsService.deleteProduct(this.productId).subscribe(
      () => this.router.navigate(['products'])
    );
  }
}
