import { Injectable, Inject, EventEmitter } from '@angular/core';

import { AlertsService } from '../alerts/alerts.service';
import { DataService } from '../shared/data.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../auth/auth.service';

import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {
    constructor(
        public alertsService: AlertsService,
        public dataService: DataService,
        public authService: AuthService,
        public firebaseAuth: AngularFireAuth
    ) { }

    categories: string[] = [
        'admin',
        'user',
        'premium',
        'provider',
        'banned'
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

    addUser(newUser) {
        // this.authService.registration(newUser);
    }

    updateUser(updatedUser) {
        return this.dataService.putData('users', updatedUser).map(
            () => this.alertsService.addAlert({ message: 'User updated', type: 'info' })
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
        let obs = new Observable(
            observer => {
                this.authService.loadCurrentUser().subscribe(
                    (user: any) => {
                        if (!user[itemCat]) {
                            user[itemCat] = [];
                        }
                        if (user[itemCat].indexOf(itemId) === -1) {
                            user[itemCat].push(itemId);
                            this.dataService.putObjValue(`users/${user.id}/${itemCat}`, user[itemCat]).subscribe();
                            observer.next(true);
                        } else {
                            observer.next(false);
                            this.alertsService.addAlert({ message: 'You have already rate it', type: 'danger' });
                        }
                    }
                );
            }
        );
        return obs;
    }
}
