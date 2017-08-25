import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';

import { ModalService } from './modal/modal.service';

import { ConfirmationComponent } from './modal/confirmation/confirmation.component';
import { SupportWindowComponent } from './support/support-window/support-window.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('modal', { read: ViewContainerRef })
  modal: ViewContainerRef;

  private confComponent = this.componentFactoryResolver.resolveComponentFactory(ConfirmationComponent);
  private suppComponent = this.componentFactoryResolver.resolveComponentFactory(SupportWindowComponent);
  private supportWindow;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService
  ) {
    let modalHolder;
    this.modalService.modalEmit.subscribe(
      res => {
        if (res.close) {
          modalHolder.destroy();
        }
        if (res.create) {
          modalHolder = this.modal.createComponent(this.confComponent);
        }
      }
    );
  }

  ngOnInit() {
  }

  toggleSupport() {
    if (this.supportWindow) {
      this.supportWindow.destroy();
      this.supportWindow = undefined;
    } else {
      this.supportWindow = this.modal.createComponent(this.suppComponent);
    }
    // console.log(this.supportWindow.changeDetectorRef.destroyed);
    // console.log(this.supportWindow);

  }
}
