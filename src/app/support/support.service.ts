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
        const testTimeout = Math.random() * 3000 + 1000;
        return new Observable(
            observer => {
                this.messages.push(new SupportMessage(msgText, new Date(), false));
                observer.next();
                setTimeout(
                    () => {
                        this.messages.push(new SupportMessage('Your opinion is very important for us :)', new Date(), true));
                        observer.next();
                    }, testTimeout
                );
            }
        );
    }
}
