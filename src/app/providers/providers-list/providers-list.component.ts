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

  constructor(
    public providersService: ProvidersService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.refreshProviders();
    this.providersService.emit.subscribe(
      () => this.refreshProviders()
    );
  }

  checkUserCategory(categories: string[]) {
    return this.authService.checkUserCategory(categories);
  }

  refreshProviders() {
    this.providers = this.providersService.getProviders();
  }

}
