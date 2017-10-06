import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class InitLoad {
    private user: any;

    constructor(
        private http: Http,
        private firebaseAuth: AngularFireAuth
    ) { }

    getAuth() {
        return this.firebaseAuth.authState;
    }

    getUser() {
        return this.user;
    }

    loadUser(): Promise<any> {
        return new Promise(
            function (resolve, reject) {
                const $this = this;
                new Observable(
                    observer => {
                        $this.getAuth().subscribe(
                            function (auth) {
                                if (auth) {
                                    $this.http.get(`https://angular-shop-e7657.firebaseio.com/users/${auth.uid}.json`).map(
                                        function (res: Response) { return res.json(); })
                                        .subscribe(
                                        function (res) {
                                            $this.user = res;
                                            observer.next(res);
                                            observer.complete();
                                        }
                                        );
                                } else {
                                    observer.next(false);
                                    observer.complete();
                                }
                            }
                        );
                    }
                ).subscribe(
                    function (res) { return resolve(true); });
            }
        );
    }
}
