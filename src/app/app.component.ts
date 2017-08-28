import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';

import { SupportWindowComponent } from './support/support-window/support-window.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static modalEmit: EventEmitter<any> = new EventEmitter();

  @ViewChild('modal', { read: ViewContainerRef })
  modal: ViewContainerRef;
  private suppComponent = this.componentFactoryResolver.resolveComponentFactory(SupportWindowComponent);
  private supportWindow;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
  }

  toggleSupport() {
    if (this.supportWindow) {
      this.supportWindow.destroy();
      this.supportWindow = undefined;
    } else {
      this.supportWindow = this.modal.createComponent(this.suppComponent);
    }
  }
}
