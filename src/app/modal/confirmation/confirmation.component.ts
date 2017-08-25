import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent {
  constructor(private modalService: ModalService) { }

  confirm() {
    this.modalService.modalEmit.emit({ confirm: true, close: true });
  }

  cancel() {
    this.modalService.modalEmit.emit({ confirm: false, close: true });
  }
}
