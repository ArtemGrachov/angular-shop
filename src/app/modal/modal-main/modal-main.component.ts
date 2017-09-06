import {
    Component,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    OnInit,
    Inject
} from '@angular/core';
import { AppComponent } from '../../app.component';

import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { SupportWindowComponent } from '../../support/support-window/support-window.component';
import { AlertComponent } from '../alert/alert.component';

import { AlertsStore } from '../../data/stores/alerts.store';
import * as AlertActions from '../../data/actions/alerts.actions';
import * as Redux from 'redux';
import { Alert } from '../../shared/models/alert.model';

@Component({
    selector: 'app-modal-main',
    templateUrl: './modal-main.component.html',
    styleUrls: ['./modal-main.component.css']
})
export class ModalMainComponent implements OnInit {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        @Inject(AlertsStore) private alertsStore: Redux.Store<Alert>
    ) {
    }
    @ViewChild('modal', { read: ViewContainerRef })
    modal: ViewContainerRef;

    private suppWindow;

    ngOnInit() {
        let modalHolder,
            alertHolder;
        AppComponent.modalEmit.subscribe(
            res => {
                if (res.create) {
                    modalHolder = this.createComponent(ConfirmationComponent);
                    modalHolder.instance.config = res.create;
                }
                if (res.close) {
                    modalHolder.destroy();
                }
            }
        );

        this.alertsStore.subscribe(
            () => {
                if (!alertHolder) {
                    alertHolder = this.createComponent(AlertComponent);
                }
                if (!this.alertsStore.getState()) {
                    alertHolder.destroy();
                    alertHolder = undefined;
                }
            }
        );
    }

    toggleSupport() {
        if (this.suppWindow) {
            this.suppWindow.destroy();
            this.suppWindow = undefined;
        } else {
            this.suppWindow = this.createComponent(SupportWindowComponent);
        }
    }

    createComponent(component: any): any {
        return this.modal.createComponent(this.componentFactoryResolver.resolveComponentFactory(component));
    }

}
