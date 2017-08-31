import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
    constructor() { }
    public alerts: { message: string, type: string }[] = [];

    ngOnInit() {
        AppComponent.modalEmit.subscribe(
            res => {
                if (res.alert) {
                    if (res.alert.add) {
                        this.alerts.push(res.alert.add);
                    }
                }
            }
        );
    }

    removeAlert(index: number) {
        this.alerts.splice(index, 1);
        if (this.alerts.length <= 0) {
            AppComponent.modalEmit.emit({ alert: { destroy: true } });
        }
    }
}
