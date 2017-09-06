import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AppComponent } from '../../app.component';

import * as Redux from 'redux';
import { AlertsStore } from '../../data/stores/alerts.store';
import * as AlertActions from '../../data/actions/alerts.actions';
import { Alert } from '../../shared/models/alert.model';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
    constructor(
        @Inject(AlertsStore) private alertStore: Redux.Store<Alert>
    ) { }
    public alerts: Alert[] = [];
    private subscription;

    ngOnInit() {
        this.subscription = this.alertStore.subscribe(
            () => this.addAlert()
        );
        this.addAlert();
    }

    ngOnDestroy() {
        this.subscription();
    }

    addAlert() {
        this.alerts.push(this.alertStore.getState());
    }

    removeAlert(index: number) {
        this.alerts.splice(index, 1);
        if (this.alerts.length <= 0) {
            this.subscription();
            this.alertStore.dispatch(AlertActions.delAlerts());
        }
    }
}
