import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DataService {
    dbUrl: string = 'https://angular-shop-e7657.firebaseio.com/';

    constructor(
        public http: Http
    ) { }

    loadDataList(listUrl: string) {
        return this.http.get(`${this.dbUrl}${listUrl}.json`)
            .map(
            (res: Response) => {
                let resJson = res.json(),
                    dataArr = [];
                for (let i in resJson) {
                    dataArr.push(resJson[i]);
                }
                return dataArr;
            }
            );
    }

    loadDataObj(objUrl) {
        return this.http.get(`${this.dbUrl}${objUrl}.json`)
            .map(
            res => res.json()
            );
    }

    putData(listUrl: string, item: any) {
        return this.http.put(`${this.dbUrl}${listUrl}/${item.id}.json`, item);
    }

    putObjValue(objUrl: string, value: any) {
        return this.http.put(`${this.dbUrl}${objUrl}.json`, value);
    }

    deleteData(itemUrl: string) {
        return this.http.delete(`${this.dbUrl}${itemUrl}.json`);
    }
}
