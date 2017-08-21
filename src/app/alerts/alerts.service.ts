import { Injectable } from '@angular/core';

import { Alert } from '../shared/models/alert.model';

@Injectable()
export class AlertsService {
    alerts: Alert[] = [];

    addAlert(alertMsg: Alert) {
        this.alerts.push(alertMsg);
    }

    removeAlert(index) {
        this.alerts.splice(index, 1);
    }

    getAlerts() {
        return this.alerts;
    }
}
