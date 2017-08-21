import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

import { ProvidersService } from '../providers.service';

import { Provider } from '../../shared/models/provider.model';

@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.css']
})
export class ProvidersListComponent implements OnInit {
  public providers: Provider[] = [];
  providerSubscr;

  constructor(
    public providersService: ProvidersService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.providersService.loadProviders();
    this.loadProviders();
  }

  loadProviders() {
    this.providersService.loadProviders().subscribe(
      res => this.providers = res
    );
  }
}
