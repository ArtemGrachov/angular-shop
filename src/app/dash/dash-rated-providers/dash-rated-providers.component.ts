import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../../providers/providers.service';
import { AuthService } from '../../auth/auth.service';

import { Provider } from '../../shared/models/provider.model';

@Component({
  selector: 'app-dash-rated-providers',
  templateUrl: './dash-rated-providers.component.html',
  styleUrls: ['./dash-rated-providers.component.css']
})
export class DashRatedProvidersComponent implements OnInit {

  constructor(
    public providersService: ProvidersService,
    public authService: AuthService
  ) { }

  providers: Provider[] = [];

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(
      (res: any) => {
        if (res.ratedProviders) {
          for (let id of res.ratedProviders) {
            this.providersService.loadProvider(id).subscribe(
              provider => this.providers.push(provider)
            );
          }
        }
      }
    );
  }

}
