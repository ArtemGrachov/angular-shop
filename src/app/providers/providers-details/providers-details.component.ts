import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { EditAccessService } from '../../shared/edit-access.service';

import { ProvidersService } from '../providers.service';
import { UsersService } from '../../admin/users.service';
import { ProductsService } from '../../products/products.service';

import { Provider } from '../../shared/models/provider.model';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-providers-details',
  templateUrl: './providers-details.component.html'
})
export class ProvidersDetailsComponent implements OnInit {
  constructor(
    private providersService: ProvidersService,
    private productsService: ProductsService,
    private editAccessService: EditAccessService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  public providerId: string = '';
  public provider: Provider;
  public providerProducts: Product[];
  public auth = this.authService.getAuth().map(
    res => {
      this.editAccessService.providerEditAccess(this.providerId).subscribe((access: boolean) => this.editAccess = access);
      return res;
    }
  );
  public editAccess: boolean = false;
  public preloader: boolean = true;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.providerId = params['id'];
        this.loadProvider();
      }
    );
  }

  loadProvider() {
    this.preloader = true;
    this.providersService.loadProvider(this.providerId)
      .subscribe(
      provider => {
        this.provider = provider;
        this.editAccessService.providerEditAccess(this.providerId).subscribe(
          (access: boolean) => this.editAccess = access,
          err => this.preloader = false,
          () => this.preloader = false
        );
      },
      err => this.preloader = false);
  }

  delete() {
    this.providersService.deleteProvider(this.providerId).subscribe(
      () => this.router.navigate(['providers'])
    );
  }

  providerRate(rate: number) {
    this.providersService.rateProvider(this.providerId, rate).subscribe(
      res => {
        this.loadProvider();
      }
    );
  }
}
