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
  templateUrl: './providers-details.component.html',
  styleUrls: ['./providers-details.component.css']
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

  providerId: string = '';
  provider: Provider;
  providerProducts: Product[];
  auth = this.authService.getAuth();
  editAccess;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.providerId = params['id'];
        this.editAccess = this.editAccessService.providerEditAccess(this.providerId);
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
