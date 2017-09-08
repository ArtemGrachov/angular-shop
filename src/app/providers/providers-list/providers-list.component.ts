import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { ProvidersService } from '../providers.service';

import { Provider } from '../../shared/models/provider.model';

@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html'
})
export class ProvidersListComponent implements OnInit {
  constructor(
    private providersService: ProvidersService,
    private authService: AuthService
  ) { }

  public providers: Provider[] = [];
  public preloader: boolean = true;

  ngOnInit() {
    this.loadProviders();
    this.providersService.emit.subscribe(
      () => this.loadProviders()
    );
  }

  loadProviders() {
    this.providersService.loadProviders().subscribe(
      res => this.providers = res,
      err => this.preloader = false,
      () => this.preloader = false
    );
  }
}
