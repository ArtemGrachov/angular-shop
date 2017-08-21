import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../admin/users.service';
import { ProvidersService } from '../../providers/providers.service';

import { Provider } from '../../shared/models/provider.model';

@Component({
  selector: 'app-dash-rated-providers',
  templateUrl: './dash-rated-providers.component.html',
  styleUrls: ['./dash-rated-providers.component.css']
})
export class DashRatedProvidersComponent implements OnInit {

  constructor(
    public usersService: UsersService,
    public providersService: ProvidersService
  ) { }

  providers: Provider[] = [];

  ngOnInit() {
    this.usersService.loadCurrentUser().subscribe(
      res => {
        for (const id of res.providers) {
          this.providersService.loadProvider(id).subscribe(
            provider => this.providers.push(provider)
          );
        }
      }
    );
  }

}
