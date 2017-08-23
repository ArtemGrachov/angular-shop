import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortByNamePipe'
})
@Injectable()
export class SortByNamePipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        return items.sort(
            (a, b) => {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                }
                return 0;
            }
        );
    }
}
