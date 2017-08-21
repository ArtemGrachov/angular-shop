import { Component, OnInit } from '@angular/core';
import { AlertsService } from './alerts.service';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
    constructor(
        public alertsService: AlertsService
    ) { }

    alerts = [];

    ngOnInit() {
        this.alerts = this.alertsService.getAlerts();
    }

    removeAlert(index) {
        this.alertsService.removeAlert(index);
    }
}
