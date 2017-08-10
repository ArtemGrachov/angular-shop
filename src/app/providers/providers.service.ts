import { Injectable } from '@angular/core';

import { Provider } from '../shared/models/provider.model';

const providers: Provider[] = [
    new Provider('0', 'Test ltd.', []),
    new Provider('1', 'Lorem Ipsum inc.', []),
    new Provider('2', 'DDD', []),
    new Provider('3', 'Apple', []),
    new Provider('4', 'Microsoft', [])
];

@Injectable()
export class ProvidersService {



}
