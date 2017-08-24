import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProvidersService } from '../../providers.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html'
})
export class DescriptionComponent implements OnInit {
  constructor(
    private providersService: ProvidersService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  providerId: string;
  description: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.providerId = this.route.snapshot.parent.params['id'];
        this.loadDescription();
      }
    );
  }

  loadDescription() {
    this.providersService.loadProvider(this.providerId).subscribe(
      provider => this.description = provider.description
    );
  }

}
