import { Component, OnInit } from '@angular/core';
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
export class ProvidersDetailsComponent implements OnInit {
  constructor(
    public providersService: ProvidersService,
    public productsService: ProductsService,
    public usersService: UsersService,
    public router: Router,
    public route: ActivatedRoute,
    public authService: AuthService
  ) { }

  providerId: string = '';
  provider: Provider;
  providerProducts: Product[];
  auth = this.authService.getAuth();


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.providerId = params['id'];
        this.loadProvider();
      }
    );
  }

  loadProvider() {
    this.providersService.loadProvider(this.providerId)
      .subscribe(
      provider => {
        this.provider = provider;
      });
  }

  checkEditAccess() {
    // if (this.authService.checkAuth()) {
    //   return this.authService.checkUserCategory(['admin'])
    //     || this.providersService
    //       .getProvider(this.providerId).users
    //       .indexOf(this.usersService.getCurrentUser().id) > -1;
    // }
    // return false;
    return true;
  }

  delete() {
    this.providersService.deleteProvider(this.providerId).subscribe(
      () => this.router.navigate(['providers'])
    );
  }

  providerRate(rate: number) {
    this.providersService.rateProvider(this.providerId, rate).subscribe(
      updater => {
        updater.subscribe(
          () => this.loadProvider()
        );
      }
    );
  }
}
