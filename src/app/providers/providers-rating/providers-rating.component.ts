import { Component, OnInit } from '@angular/core';

import { ProvidersService } from '../providers.service';

import { Provider } from '../../shared/models/provider.model';

@Component({
    selector: 'app-providers-rating',
    templateUrl: './providers-rating.component.html'
})
export class ProvidersRatingComponent implements OnInit {
    constructor(
        private providersService: ProvidersService
    ) { }

    public providers: Provider[] = [];
    public preloader: string[] = ['providers'];

    ngOnInit() {
        this.loadProviders();
    }

    loadProviders() {
        this.providersService.loadProviders().subscribe(
            res => {
                this.providers = res;
                this.preloader = this.preloader.filter(str => str !== 'providers');
            }
        );
    }
}
