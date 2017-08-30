import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appPreloader]'
})
export class PreloaderDirective {
    constructor(private elRef: ElementRef) {
        this.spinner = {
            radius: 300,
            center: 150,
            speed: 1,
            duration: 1,
            size: 10,
            color: 'black'
        };
        this.elRef.nativeElement.innerHTML = `
            <svg
                width="${this.spinner.radius}"
                height="${this.spinner.radius}">
            <circle
                id="circle1"
                cx="${this.spinner.center}"
                cy="${this.spinner.size}"
                r="${this.spinner.size}"
                fill="${this.spinner.color}" />
            <circle
                id="circle2"
                cx="${this.spinner.center}"
                cy="${this.spinner.size}"
                r="${this.spinner.size * 0.8}"
                fill="${this.spinner.color}" />
            <circle
                id="circle3"
                cx="${this.spinner.center}"
                cy="${this.spinner.size}"
                r="${this.spinner.size * 0.5}"
                fill="${this.spinner.color}" />
            <animateTransform
                xlink:href="#circle1"
                attributeName="transform"
                type="rotate"
                from="0 ${this.spinner.center} ${this.spinner.center}"
                to="360 ${this.spinner.center} ${this.spinner.center}"
                attributeType="XML"
                dur="${this.spinner.speed}s"
                id="rotate1"
                begin="0;rotate1.end + ${this.spinner.speed * 0.8}s" />
            <animateTransform
                xlink:href="#circle2"
                attributeName="transform"
                type="rotate"
                from="0 ${this.spinner.center} ${this.spinner.center}"
                to="360 ${this.spinner.center} ${this.spinner.center}"
                attributeType="XML"
                dur="${this.spinner.speed * 0.8}s"
                id="rotate2"
                begin="rotate1.begin + ${this.spinner.speed}s" />
            <animateTransform
                xlink:href="#circle3"
                attributeName="transform"
                type="rotate"
                from="0 ${this.spinner.center} ${this.spinner.center}"
                to="360 ${this.spinner.center} ${this.spinner.center}"
                attributeType="XML"
                dur="${this.spinner.speed * 0.5}s"
                id="rotate3"
                begin="rotate1.begin + ${this.spinner.speed * 1.3}s" />
        </svg>`;
    }
    spinner: any;
}
