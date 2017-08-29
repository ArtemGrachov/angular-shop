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
  public auth = this.authService.getAuth();
  public editAccess;
  public preloader: boolean = true;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.preloader = true;
        this.providerId = params['id'];
        this.editAccess = this.editAccessService.providerEditAccess(this.providerId).map(
          res => {
            if (this.provider) {
              this.preloader = false;
            }
            return res;
          }
        );
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
