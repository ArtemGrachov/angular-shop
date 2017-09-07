import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { ProvidersService } from '../../providers/providers.service';

import { Provider } from '../../shared/models/provider.model';

@Component({
  selector: 'app-dash-rated-providers',
  templateUrl: './dash-rated-providers.component.html'
})
export class DashRatedProvidersComponent implements OnInit {

  constructor(
    private providersService: ProvidersService,
    private authService: AuthService
  ) { }

  public providers: Provider[] = [];
  public preloader: boolean = true;
  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user.ratedProviders) {
      for (const id of user.ratedProviders) {
        this.providersService.loadProvider(id).subscribe(
          provider => {
            this.preloader = false;
            this.providers.push(provider);
          }
        );
      }
    }
  }

}
