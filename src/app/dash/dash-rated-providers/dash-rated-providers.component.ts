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
    this.authService.loadCurrentUser().subscribe(
      (res: any) => {
        if (res.ratedProviders) {
          for (const id of res.ratedProviders) {
            this.providersService.loadProvider(id).subscribe(
              provider => {
                this.providers.push(provider);
              }
            );
          }
        }
      },
      err => { },
      () => this.preloader = false
    );
  }

}
