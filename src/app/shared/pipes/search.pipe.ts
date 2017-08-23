import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {
    transform(items: any[], value: string, query: string): any {
        return items.filter(
            (item) => {
                if (query) {
                    return item[value].toLowerCase().indexOf(query.toLowerCase()) > -1;
                } else {
                    return item;
                }
            }
        );
    }
}
