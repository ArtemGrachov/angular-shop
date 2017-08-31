import { Component, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  static modalEmit: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

}
