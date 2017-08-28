import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';

import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { SupportWindowComponent } from '../../support/support-window/support-window.component';

@Component({
    selector: 'app-modal-main',
    templateUrl: './modal-main.component.html',
    styleUrls: ['./modal-main.component.css']
})
export class ModalMainComponent implements OnInit {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }
    @ViewChild('modal', { read: ViewContainerRef })
    modal: ViewContainerRef;

    private confComponent = this.componentFactoryResolver.resolveComponentFactory(ConfirmationComponent);
    private suppComponent = this.componentFactoryResolver.resolveComponentFactory(SupportWindowComponent);
    private suppWindow;

    ngOnInit() {
        let modalHolder;
        AppComponent.modalEmit.subscribe(
            res => {
                if (res.create) {
                    modalHolder = this.modal.createComponent(this.confComponent);
                    modalHolder.instance.config = res.create;
                }
                if (res.close) {
                    modalHolder.destroy();
                }
            }
        );
    }

    toggleSupport() {
        if (this.suppWindow) {
            this.suppWindow.destroy();
            this.suppWindow = undefined;
        } else {
            this.suppWindow = this.modal.createComponent(this.suppComponent);
        }
    }
}
