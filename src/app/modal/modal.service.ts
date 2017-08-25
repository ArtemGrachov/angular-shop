import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalService {
    constructor() {
        this.modalEmit.subscribe(
            res => {
                if (res.create) {
                    this.config = res.create;
                }
            }
        );
    }

    private config;

    getConfig() {
        return this.config;
    }

    public modalEmit: EventEmitter<any> = new EventEmitter();
}