import { InjectionToken } from '@angular/core';
import { createStore, Store } from 'redux';
import { Alert } from '../../shared/models/alert.model';

import {
    alertReducer
} from '../reducers/alerts.reducer';

export const AlertsStore = new InjectionToken('App.store');

export function createModalStore(): Store<Alert> {
    return createStore<Alert>(
        alertReducer
    );
}

export const alertsStoreProviders = [
    { provide: AlertsStore, useFactory: createModalStore }
];
