import { Injectable, EventEmitter } from '@angular/core';

import { DataService } from '../shared/data.service';
import { UsersService } from '../admin/users.service';

import { AlertsService } from '../alerts/alerts.service';

import { Provider } from '../shared/models/provider.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProvidersService {
    constructor(
        public usersService: UsersService,
        public dataService: DataService,
        public alertsService: AlertsService
    ) { }

    private providers: Provider[] = [];
    public emit: EventEmitter<any> = new EventEmitter();

    loadProviders() {
        return this.dataService.loadDataList('providers');
    }

    loadProvider(id: String) {
        return this.dataService.loadDataObj(`providers/${id}`);
    }

    addProvider(newProvider: Provider) {
        newProvider.id = (new Date).getTime().toString();
        return this.dataService.putData('providers', newProvider).map(
            () => {
                this.emit.emit();
                this.alertsService.addAlert({ message: 'Provider added', type: 'success' });
            }
        );
    }

    updateProvider(updatedProvider: Provider) {
        return this.dataService.putData('providers', updatedProvider).map(
            () => {
                this.emit.emit();
                this.alertsService.addAlert({ message: 'Provider updated', type: 'info' });
            }
        );
    }

    deleteProvider(id: string) {
        return this.dataService.deleteData('providers/' + id).map(
            () => {
                this.emit.emit();
                this.alertsService.addAlert({ message: 'Provider deleted', type: 'warning' })
            }
        );
    }

    rateProvider(id: string, rate: number) {
        let obs = new Observable(
            observer => {
                this.usersService.rateItem(id, 'ratedProviders').subscribe(
                    res => {
                        if (res) {
                            this.loadProvider(id).subscribe(
                                provider => {
                                    provider.rating += rate;
                                    this.dataService.putObjValue(`providers/${provider.id}/rating`, provider.rating).subscribe(
                                        res => observer.next(true)
                                    );
                                }
                            );
                        } else {
                            observer.next(false);
                            observer.complete();
                        }
                    }
                );
            }
        );
        return obs;
    }

    addComment(providerId: string, comment: string) {
        return this.loadProvider(providerId).map(
            provider => {
                if (!provider.comments) {
                    provider.comments = [];
                }
                provider.comments.push(comment);
                return this.dataService.putData('providers', provider);
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
