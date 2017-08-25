import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SupportService } from '../support.service';

import { SupportMessage } from '../../shared/models/support-message.model';

@Component({
  selector: 'app-support-window',
  templateUrl: './support-window.component.html',
  styleUrls: ['./support-window.component.css']
})
export class SupportWindowComponent implements OnInit {
  @ViewChild('suppChat') suppChat: ElementRef;
  @ViewChild('suppMsg') suppMsg: ElementRef;

  constructor(
    private supportService: SupportService
  ) { }

  messages: SupportMessage[] = this.supportService.messages;

  ngOnInit() {
    this.scrollBottom();
  }

  scrollBottom() {
    this.suppChat.nativeElement.scrollTop = this.suppChat.nativeElement.scrollHeight;
  }

  sendMsg() {
    let msg = this.suppMsg.nativeElement.value;
    if (msg.length > 0) {
      this.supportService.sendMessage(msg).subscribe(
        () => {
          setTimeout(() => this.scrollBottom(), 0);
        }
      );
      this.suppMsg.nativeElement.value = '';
    }
  }

}
