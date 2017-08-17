import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

import { ProvidersService } from '../providers.service';

import { Provider } from '../../shared/models/provider.model';

@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.css']
})
export class ProvidersListComponent implements OnInit, OnDestroy {
  public providers: Provider[] = [];
  providerSubscr;

  constructor(
    public providersService: ProvidersService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.providersService.loadProviders();
    this.providerSubscr = this.providersService.emit.subscribe(
      () => this.refreshProviders()
    );
  }

  ngOnDestroy() {
    this.providerSubscr.unsubscribe();
  }

  checkUserCategory(categories: string[]) {
    return this.authService.checkUserCategory(categories);
  }

  refreshProviders() {
    this.providers = this.providersService.getProviders();
  }

}
