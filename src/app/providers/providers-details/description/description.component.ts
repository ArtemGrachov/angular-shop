import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProvidersService } from '../../providers.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  providerId: string = '';
  description: string = '';

  constructor(
    public providersService: ProvidersService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.providerId = this.route.snapshot.parent.params['id'];
        this.description = this.providersService.getProvider(this.providerId).description;
      }
    );
  }

}
