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
            (res) => {
                console.log('user', res);
            }
        );
    }

    authState: Observable<firebase.User>;

    getAuth() {
        return this.authState;
    }

    login(email: string, password: string) {
        this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
            .then(
            res => {
                this.usersService.setCurrentUserId(res.uid);
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
                this.usersService.setCurrentUserId(res.uid);
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
                this.usersService.setCurrentUserId(res.uid);
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
        delete newUser.email;
        delete newUser.password;
        newUser.id = uid;
        newUser.category = 'user',
            this.dataService.putData('users/', newUser).subscribe(
                res => console.log(res)
            );
    }

}
