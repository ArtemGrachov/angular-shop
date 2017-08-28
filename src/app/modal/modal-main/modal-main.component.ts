import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';

import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
    selector: 'app-modal-main',
    templateUrl: './modal-main.component.html'
})
export class ModalMainComponent implements OnInit {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }
    @ViewChild('modal', { read: ViewContainerRef })
    modal: ViewContainerRef;

    private confComponent = this.componentFactoryResolver.resolveComponentFactory(ConfirmationComponent);

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
}
