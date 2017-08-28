import { Component, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent {
  constructor() { }

  public output: EventEmitter<any> = new EventEmitter();

  confirm() {
    AppComponent.modalEmit.emit({ confirm: true, close: true });
  }

  cancel() {
    AppComponent.modalEmit.emit({ confirm: false, close: true });
  }
}
