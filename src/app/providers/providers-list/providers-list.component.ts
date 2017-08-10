import { Component, OnInit } from '@angular/core';

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
    public providersService: ProvidersService
  ) { }

  ngOnInit() {
    this.providers = this.providersService.getProviders();
  }

}
