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
  public preloader: string[] = ['user', 'providers'];

  ngOnInit() {
    this.authService.loadCurrentUser().subscribe(
      (res: any) => {
        this.preloader = this.preloader.filter(str => str !== 'user');

        if (res.ratedProviders) {
          for (const id of res.ratedProviders) {
            this.providersService.loadProvider(id).subscribe(
              provider => {
                this.providers.push(provider);
                this.preloader = this.preloader.filter(str => str !== 'providers');
              }
            );
          }
        } else {
          this.preloader = this.preloader.filter(str => str !== 'providers');
        }
      }
    );
  }

}
