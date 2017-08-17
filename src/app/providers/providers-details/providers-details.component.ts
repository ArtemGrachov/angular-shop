import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

import { ProvidersService } from '../providers.service';
import { UsersService } from '../../admin/users.service';
import { ProductsService } from '../../products/products.service';

import { Provider } from '../../shared/models/provider.model';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-providers-details',
  templateUrl: './providers-details.component.html',
  styleUrls: ['./providers-details.component.css']
})
export class ProvidersDetailsComponent implements OnInit, OnDestroy {
  providerId: string = '';
  provider: Provider;
  providerProducts: Product[];
  isAuth: boolean = this.authService.checkAuth();
  authSubcr;
  providerSubscr;

  constructor(
    public providersService: ProvidersService,
    public productsService: ProductsService,
    public usersService: UsersService,
    public router: Router,
    public route: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.providerId = params['id'];
      }
    );
    this.authSubcr = this.authService.emit.subscribe(
      () => this.isAuth = this.authService.checkAuth()
    );
    this.providerSubscr = this.providersService.emit.subscribe(
      () => this.refreshProvider()
    );
  }

  ngOnDestroy() {
    this.authSubcr.unsubscribe();
    this.providerSubscr.unsubscribe();
  }

  refreshProvider() {
    this.provider = this.providersService.getProvider(this.providerId);
    this.providerProducts = this.productsService.getProductsByProvider(this.providerId);
  }

  checkEditAccess() {
    if (this.authService.checkAuth()) {
      return this.authService.checkUserCategory(['admin'])
        || this.providersService
          .getProvider(this.providerId).users
          .indexOf(this.usersService.getCurrentUser().id) > -1;
    }
    return false;
  }

  delete() {
    this.providersService.deleteProvider(this.providerId);
    this.router.navigate(['providers']);
  }

  providerRate(rate: number) {
    this.providersService.rateProvider(this.providerId, rate);
  }
}
