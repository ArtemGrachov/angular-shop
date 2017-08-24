import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'textPipe'
})
export class TextPipe implements PipeTransform {
    transform(text: string): string {
        return `${text.replace(/\n/, '<br>')}`;
    }
}
