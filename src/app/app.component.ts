import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { ModalService } from './modal/modal.service';

import { ConfirmationComponent } from './modal/confirmation/confirmation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('modal', { read: ViewContainerRef })
  modal: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService
  ) {
    const confComponent = this.componentFactoryResolver.resolveComponentFactory(ConfirmationComponent);
    let modalHolder;
    this.modalService.modalEmit.subscribe(
      res => {
        if (res.close) {
          modalHolder.destroy();
        }
        if (res.create) {
          modalHolder = this.modal.createComponent(confComponent);
        }
      }
    );
  }

}
