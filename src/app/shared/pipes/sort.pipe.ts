import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortPipe'
})
export class SortPipe implements PipeTransform {
    transform(items: any[], query: string, reverse: boolean): any {
        return items.sort(
            (a, b) => {
                if (a[query] > b[query]) {
                    return reverse ? -1 : 1;
                } else if (a[query] < b[query]) {
                    return reverse ? 1 : -1;
                }
                return 0;
            }
        );
    }
}
