import { Injectable } from '@angular/core';

import { DataService } from '../shared/data.service';
import { UsersService } from '../admin/users.service';

import { Provider } from '../shared/models/provider.model';

@Injectable()
export class ProvidersService {
    constructor(
        public usersService: UsersService,
        public dataService: DataService
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
        return this.dataService.putData('providers', newProvider);
    }

    updateProvider(updatedProvider: Provider) {
        return this.dataService.putData('providers', updatedProvider);
    }

    deleteProvider(id: string) {
        return this.dataService.deleteData('providers/' + id);
    }

    rateProvider(id: string, rate: number) {
        return this.loadProvider(id).map(
            provider => {
                provider.rating += rate;
                return this.updateProvider(provider);
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
        this.loadProviders().map(
            res => {
                let providers = [];
                for (const provider of providers) {
                    if (provider.users.indexOf(userId) > -1) {
                        providers.push(provider);
                    }
                }
                return providers;
            }
        );
    }
}
