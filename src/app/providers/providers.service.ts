import { Injectable } from '@angular/core';

import { Provider } from '../shared/models/provider.model';

@Injectable()
export class ProvidersService {
    private providers: Provider[] = [
        new Provider('0', 'Test ltd.', 'https://www.childrenslearninginstitute.org/assets/aoes/aoe-logo.png', []),
        new Provider('1', 'Lorem Ipsum inc.', 'http://static.tumblr.com/kb1bvwn/qpym42qv3/tumblr.png', []),
        new Provider('2', 'DDD', 'http://www.sundaramart.com/images/brand-logo1.png', []),
        new Provider('3', 'Apple', 'http://logok.org/wp-content/uploads/2014/04/Apple-logo-Glass-themed.png', []),
        new Provider('4', 'Microsoft', 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Microsoft_logo_%282012%29_modified.png', [])
    ];

    getProviders() {
        return this.providers.slice();
    }

    getProvider(id: String) {
        return this.providers.find(
            (provider) => provider.id === id
        );
    }

    addProvider(newProvider: Provider) {
        this.providers.push(newProvider);
    }

    updateProvider(id: string, updatedProvider: Provider) {
        for (const i in this.providers) {
            if (this.providers[i].id === id) {
                this.providers[i] = updatedProvider;
                return;
            }
        }
    }

    deleteProvider(id: string) {
        for (const index in this.providers) {
            if (this.providers[index].id === id) {
                this.providers.splice(+index, 1);
            }
        }
    }
}
