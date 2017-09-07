import { Injectable, Inject, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { DataService } from '../shared/data.service';

import { AuthService } from '../auth/auth.service';

import * as Redux from 'redux';
import { AlertsStore } from '../data/stores/alerts.store';
import * as AlertActions from '../data/actions/alerts.actions';
import { Alert } from '../shared/models/alert.model';

import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {
    constructor(
        private dataService: DataService,
        private authService: AuthService,
        private firebaseAuth: AngularFireAuth,
        @Inject(AlertsStore) private alertStore: Redux.Store<Alert>
    ) { }

    categories: string[] = [
        'admin',
        'user',
        'premium',
        'provider'
    ];
    currentUserId: string = '';

    setCurrentUserId(id: string) {
        this.currentUserId = id;
    }

    getCategories() {
        return this.categories.slice();
    }

    loadUsers() {
        return this.dataService.loadDataList('users');
    }

    loadUser(userId: string) {
        return this.dataService.loadDataObj(`users/${userId}`);
    }

    updateUser(updatedUser) {
        return this.dataService.putData('users', updatedUser).map(
            () => this.alertStore.dispatch(AlertActions.addAlert(new Alert('User updated', 'info')))
        );
    }

    updateCurrentUser(updatedUser) {
        const currentUser = this.firebaseAuth.auth.currentUser;
        const psw = updatedUser.password;
        delete updatedUser.password;

        return this.updateUser(updatedUser).map(
            () => {
                if (psw) {
                    // reassign!
                    currentUser.updatePassword(psw);
                }
                currentUser.updateEmail(updatedUser.email);
            }
        );
    }

    getLatest(count: number) {
        return this.loadUsers().map(
            res => {
                res.sort(
                    function (a, b) {
                        if (a.date < b.date) {
                            return 1;
                        } else if (a.date > b.date) {
                            return - 1;
                        } else {
                            return 0;
                        }
                    }
                );
                return res.slice(0, count);
            }
        );
    }

    getCount() {
        return this.loadUsers().map(
            res => res.length
        );
    }

    rateItem(itemId: string, itemCat: string) {
        return new Observable(
            observer => {
                const user = this.authService.getCurrentUser();
                if (!user[itemCat]) {
                    user[itemCat] = [];
                }
                if (user[itemCat] && user[itemCat].indexOf(itemId) === -1) {
                    user[itemCat].push(itemId);
                    this.dataService.putObjValue(`users/${user.id}/${itemCat}`, user[itemCat]).subscribe();
                    this.alertStore.dispatch(AlertActions.addAlert(new Alert('Thanks for your opinion!', 'success')));
                    observer.next(true);
                    observer.complete();
                } else {
                    observer.next(false);
                    this.alertStore.dispatch(AlertActions.addAlert(new Alert('You have already rate it', 'danger')));
                    observer.complete();
                }
            }
        );
    }
}
