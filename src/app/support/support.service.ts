import { Injectable } from '@angular/core';

import { SupportMessage } from '../shared/models/support-message.model';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class SupportService {
    constructor() { }
    messages: SupportMessage[] = [];

    getMessages() {
        return this.messages;
    }

    sendMessage(msgText: string) {
        const testTimeout = Math.random() * 7000 + 1500;
        return new Observable(
            observer => {
                this.messages.push(new SupportMessage(msgText, false));
                observer.next();
                setTimeout(
                    () => {
                        this.messages.push(new SupportMessage('Your opinion is very important for us :)', true));
                        observer.next();
                    }, testTimeout
                );
            }
        );
    }
}
