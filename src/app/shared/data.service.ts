import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as firebase from 'firebase/app';

import { AppComponent } from './../app.component'; // test!

import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class DataService {
    constructor(
        private http: Http
    ) { }
    dbUrl: string = 'https://angular-shop-e7657.firebaseio.com/';
    token: string = '';

    getToken() {
        firebase.auth().currentUser.getIdToken().then(
            (token: string) => this.token = token
        );
    }

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
            });
    }

    loadDataObj(objUrl) {
        return this.http.get(`${this.dbUrl}${objUrl}.json`)
            .map(res => res.json());
    }

    putData(listUrl: string, item: any) {
        this.getToken();
        return this.http.put(`${this.dbUrl}${listUrl}/${item.id}.json?auth=${this.token}`, item);
    }

    putDataUnAuth(listUrl: string, item: any) {
        return this.http.put(`${this.dbUrl}${listUrl}/${item.id}.json`, item);
    }

    putObjValue(objUrl: string, value: any) {
        this.getToken();
        return this.http.put(`${this.dbUrl}${objUrl}.json?auth=${this.token}`, value);
    }

    deleteData(itemUrl: string, modal: boolean) {
        let obs = new Observable(
            observer => {
                const del = () => {
                    this.getToken();
                    this.http.delete(`${this.dbUrl}${itemUrl}.json?auth=${this.token}`).subscribe(
                        res => {
                            observer.next(res);
                            observer.complete();
                        }
                    );
                };
                if (modal) {
                    AppComponent.modalEmit.emit({
                        create: {
                            title: 'Confirm deleting',
                            text: 'Are you sure to delete this item?',
                            confirmText: 'Delete',
                            cancelText: 'Cancel'
                        }
                    });
                    let confSub = AppComponent.modalEmit.subscribe(
                        res => {
                            if (res.confirm) {
                                del();
                            } else {
                                observer.complete();
                            }
                            confSub.unsubscribe();
                        }
                    );
                } else {
                    del();
                }
            }
        );
        return obs;
    }

    saveCSV(table: any[], filename: string) {
        const date = new Date;
        const csv = table.map(
            row => row.map(cell => {
                if (typeof (cell) === 'object') { return cell.join(' '); }
                return cell;
            }).join(',')
        ).join('\n');
        const csvFile = new Blob([csv], { type: 'text/csv' }),
            downloadLink = document.createElement('a');
        downloadLink.download = `${filename}_${date.getDay()}_${date.getMonth()}_${date.getFullYear()}.csv`;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
