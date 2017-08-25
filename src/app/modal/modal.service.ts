import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalService {
    constructor() {
    }
    public modalEmit: EventEmitter<any> = new EventEmitter();
}
