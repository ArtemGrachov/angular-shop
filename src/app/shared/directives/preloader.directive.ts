import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appPreloader]'
})
export class PreloaderDirective {
    constructor(private elRef: ElementRef) {
        this.elRef.nativeElement.innerHTML = '<h1>Wait a moment</h1>';
    }
}
