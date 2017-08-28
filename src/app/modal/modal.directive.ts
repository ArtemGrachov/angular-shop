import { Directive, HostListener, ElementRef, Input, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appModal]'
})
export class ModalDirective {
    constructor(private elRef: ElementRef) { }
    private click: Boolean = false;
    @Input() event;

    @HostListener('document:click', ['$event.target'])
    onClick(target) {
        if (!this.elRef.nativeElement.contains(target)) {
            if (this.click) {
                this.event();
            } else {
                this.click = true;
            }
        }
    }
}
