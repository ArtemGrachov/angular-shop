import { Component, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static modalEmit: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

}
