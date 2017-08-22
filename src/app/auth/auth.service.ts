import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataService } from '../shared/data.service';

import { UsersService } from '../admin/users.service';
import { AlertsService } from '../alerts/alerts.service';

import { User } from '../shared/models/user.model';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    constructor(
        public usersService: UsersService,
        public router: Router,
        public route: ActivatedRoute,
        public alertsService: AlertsService,
        public dataService: DataService,
        public firebaseAuth: AngularFireAuth
    ) {
        this.authState = firebaseAuth.authState;
        this.authState.subscribe(
            res => {
                if (res) {
                    this.currentUid = res.uid;
                } else {
                    this.currentUid = '';
                }
            }
        );
    }

    private authState: Observable<firebase.User>;
    private currentUid: string = '';

    getAuth() {
        return this.authState;
    }

    getUid() {
        return this.currentUid;
    }

    getCurrentUser() {
        let obs = new Observable(
            observer => {
                this.getAuth().subscribe(
                    auth => {
                        if (auth) {
                            this.usersService.loadUser(auth.uid).subscribe(
                                res => {
                                    observer.next(res);
                                    observer.complete();
                                }
                            );
                        }
                    }
                );
            }
        );
        return obs;
    }

    login(email: string, password: string) {
        this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
            .then(
            res => {
            })
            .catch(
            res => this.alertsService.addAlert({ message: res.message, type: 'danger' })
            );
    }

    loginGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.firebaseAuth.auth.signInWithPopup(provider)
            .then(
            res => {
            })
            .catch(
            res => this.alertsService.addAlert({ message: res.message, type: 'danger' })
            );
    }

    loginFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider();
        this.firebaseAuth.auth.signInWithPopup(provider)
            .then(
            res => {
            })
            .catch(
            res => this.alertsService.addAlert({ message: res.message, type: 'danger' })
            );
    }

    logout() {
        this.firebaseAuth.auth.signOut();
    }

    registration(newUser) {
        newUser.regDate = new Date();

        this.firebaseAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(
            res => {
                this.login(newUser.email, newUser.password);
                this.createUserData(newUser, res.uid);
            })
            .catch(
            res => this.alertsService.addAlert({ message: res.message, type: 'danger' })
            );
    }

    createUserData(newUser, uid: string) {
        delete newUser.password;
        newUser.id = uid;
        newUser.category = 'user',
            this.dataService.putData('users/', newUser).subscribe(
                res => console.log(res)
            );
    }

    checkUserCategory(categories: string[]) {
        return new Observable(
            observer => {
                this.getCurrentUser().subscribe(
                    (user: any) => {
                        if (categories.indexOf(user.category) > -1) {
                            observer.next(true);
                        } else {
                            observer.next(false);
                        }
                    }
                );
            }
        );
    }
}
