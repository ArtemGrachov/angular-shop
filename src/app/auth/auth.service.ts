import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataService } from '../shared/data.service';

import { AlertsService } from '../alerts/alerts.service';

import { User } from '../shared/models/user.model';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private alertsService: AlertsService,
        private dataService: DataService,
        private firebaseAuth: AngularFireAuth
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

    loadCurrentUser() {
        let obs = new Observable(
            observer => {
                this.getAuth().subscribe(
                    auth => {
                        if (auth) {
                            this.dataService.loadDataObj(`users/${auth.uid}`).subscribe(
                                (res) => {
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
        );
        return obs;
    }

    login(email: string, password: string) {
        this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
            .then(
            res => {
                this.loginRedirect();
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
                this.loginRedirect();
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
                this.loginRedirect();
            })
            .catch(
            res => this.alertsService.addAlert({ message: res.message, type: 'danger' })
            );
    }

    logout() {
        this.firebaseAuth.auth.signOut();
        this.router.navigate(['/']);
    }

    loginRedirect() {
        this.router.navigate(['dash']);
    }

    registration(newUser) {
        this.createNewUser(newUser).then(
            () =>
                res => {
                    this.login(newUser.email, newUser.password);
                    this.createUserData(newUser, res.uid);
                }
        );
    }

    createNewUser(newUser) {
        newUser.regDate = new Date();
        newUser.ratedNews = [];
        newUser.ratedProducts = [];
        newUser.ratedProviders = [];
        return this.firebaseAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(
            res => {
                this.createUserData(newUser, res.uid);
            }).catch(
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
        let obs = new Observable(
            observer => {
                this.loadCurrentUser().subscribe(
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
        return obs;
    }
}
