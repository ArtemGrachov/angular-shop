import { Injectable, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataService } from '../shared/data.service';
import { InitLoad } from '../app.initload';

import * as Redux from 'redux';
import { AlertsStore } from '../data/stores/alerts.store';
import * as AlertActions from '../data/actions/alerts.actions';
import { Alert } from '../shared/models/alert.model';

import { User } from '../shared/models/user.model';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dataService: DataService,
        private firebaseAuth: AngularFireAuth,
        private initLoad: InitLoad,
        @Inject(AlertsStore) private alertStore: Redux.Store<Alert>
    ) {
        this.currentUser = this.initLoad.getUser();
        this.authState = firebaseAuth.authState;
        this.authState.subscribe(
            auth => {
                if (auth) {
                    this.dataService.getToken();
                    this.dataService.loadDataObj(`users/${auth.uid}`).subscribe(user => this.currentUser = user);
                } else {
                    this.currentUser = undefined;
                }
            }
        );
    }

    private authState: Observable<firebase.User>;
    private currentUser: any;

    getAuth() {
        return this.authState;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    login(email: string, password: string) {
        this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
            .then(
            res => {
                this.onLogin();
            })
            .catch(
            res => this.alertStore.dispatch(AlertActions.addAlert(new Alert(res.message, 'danger')))
            );
    }

    loginGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.firebaseAuth.auth.signInWithPopup(provider)
            .then(
            res => {
                this.onLogin();
            })
            .catch(
            res => this.alertStore.dispatch(AlertActions.addAlert(new Alert(res.message, 'danger')))
            );
    }

    loginFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider();
        this.firebaseAuth.auth.signInWithPopup(provider)
            .then(
            res => {
                this.onLogin();
            })
            .catch(
            res => this.alertStore.dispatch(AlertActions.addAlert(new Alert(res.message, 'danger')))
            );
    }

    onLogin() {
        this.router.navigate(['home']); // dash > home
    }

    logout() {
        this.firebaseAuth.auth.signOut();
        if (this.router.url.indexOf('admin') !== -1 || this.router.url.indexOf('dash') !== -1) {
            this.router.navigate(['/login']);
        }
    }

    registration(newUser) {
        const psw = newUser.password;
        this.createNewUser(newUser).then(
            () => {
                this.login(newUser.email, psw);
            });
    }

    createNewUser(newUser) {
        newUser.regDate = new Date();
        const auth = this.firebaseAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password);
        auth.then(
            res => {
                this.createUserData(newUser, res.uid);
            }).catch(
            res => this.alertStore.dispatch(AlertActions.addAlert(new Alert(res.message, 'danger')))
            );
        return auth;
    }

    createUserData(newUser, uid: string) {
        delete newUser.password;
        newUser.id = uid;
        newUser.category = 'user',
            this.dataService.putDataUnAuth('users/', newUser).subscribe();
    }

    checkUserCategory(categories: string[]): boolean {
        if (this.currentUser) {
            return categories.indexOf(this.currentUser.category) > -1;
        } else {
            return false;
        }
    }
}
