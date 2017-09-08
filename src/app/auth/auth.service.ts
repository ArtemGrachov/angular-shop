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
        this._currentUser = this.initLoad.getUser();
        this.authState = firebaseAuth.authState.map(
            auth => {
                if (auth) {
                    this.dataService.getToken();
                    this.refreshCurrentUser(auth.uid).subscribe();
                } else {
                    this._currentUser = undefined;
                }
                return auth;
            }
        );
        this.authState.subscribe();
    }
    private authState: Observable<firebase.User>;
    public _currentUser: any;

    refreshCurrentUser(uid) {
        return this.dataService.loadDataObj(`users/${uid}`).map(user => this._currentUser = user);
    }

    getAuth() {
        return this.authState;
    }

    getCurrentUser() {
        return this._currentUser;
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
        this.router.navigate(['home']); // 'dash' changed to 'home' - dash load before user data!
    }

    logout() {
        this.firebaseAuth.auth.signOut();
        if (this.router.url.indexOf('admin') !== -1 || this.router.url.indexOf('dash') !== -1) {
            this._currentUser = undefined;
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
        if (this._currentUser) {
            return categories.indexOf(this._currentUser.category) > -1;
        } else {
            return false;
        }
    }
}
