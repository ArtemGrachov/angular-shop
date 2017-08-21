import { Injectable } from '@angular/core';

import { DataService } from '../shared/data.service';
import { UsersService } from '../admin/users.service';

import { AlertsService } from '../alerts/alerts.service';

import { Provider } from '../shared/models/provider.model';

@Injectable()
export class ProvidersService {
    constructor(
        public usersService: UsersService,
        public dataService: DataService,
        public alertsService: AlertsService
    ) { }

    private providers: Provider[] = [];

    loadProviders() {
        return this.dataService.loadDataList('providers');
    }

    loadProvider(id: String) {
        return this.dataService.loadDataObj(`providers/${id}`);
    }

    addProvider(newProvider: Provider) {
        newProvider.id = (new Date).getTime().toString();
        return this.dataService.putData('providers', newProvider).map(
            () => this.alertsService.addAlert({ message: 'Provider added', type: 'success' })
        );
    }

    updateProvider(updatedProvider: Provider) {
        return this.dataService.putData('providers', updatedProvider).map(
            () => this.alertsService.addAlert({ message: 'Provider updated', type: 'info' })
        );
    }

    deleteProvider(id: string) {
        return this.dataService.deleteData('providers/' + id).map(
            () => this.alertsService.addAlert({ message: 'Provider deleted', type: 'warning' })
        );
    }

    rateProvider(id: string, rate: number) {
        return this.loadProvider(id).map(
            provider => {
                provider.rating += rate;
                return this.dataService.putData('providers', provider);
            }
        );
    }

    addComment(providerId: string, comment: string) {
        return this.loadProvider(providerId).map(
            provider => {
                provider.comments.push(comment);
                return this.updateProvider(provider);
            }
        );
    }

    deleteComment(providerId: string, commentIndex: string) {
        this.loadProvider(providerId).subscribe(
            provider => {
                provider.comments.splice(+commentIndex, 1);
                this.updateProvider(provider);
            }
        );
    }

    getProvidersByUserId(userId: string) {
        return this.loadProviders().map(
            res => {
                let providers = [];
                for (const provider of res) {
                    if (provider.users.indexOf(userId) > -1) {
                        providers.push(provider);
                    }
                }
                return providers;
            }
        );
    }
}
