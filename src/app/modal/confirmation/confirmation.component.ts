import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {
  constructor(private modalService: ModalService) { }
  config = {
    title: 'Title',
    text: 'Text',
    confirmText: 'Yes',
    cancelText: 'No'
  };

  ngOnInit() {
    this.config = this.modalService.getConfig();
  }

  confirm() {
    this.modalService.modalEmit.emit({ confirm: true, close: true });
  }

  cancel() {
    this.modalService.modalEmit.emit({ confirm: false, close: true });
  }
}
