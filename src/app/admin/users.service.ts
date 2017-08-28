import { Injectable, Inject, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { DataService } from '../shared/data.service';

import { AuthService } from '../auth/auth.service';

import { AppComponent } from '../app.component';

import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {
    constructor(
        private dataService: DataService,
        private authService: AuthService,
        private firebaseAuth: AngularFireAuth
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
            () => AppComponent.modalEmit.emit({ alert: { add: { message: 'User updated', type: 'info' } } })
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
                        if (user[itemCat] && user[itemCat].indexOf(itemId) === -1) {
                            user[itemCat].push(itemId);
                            this.dataService.putObjValue(`users/${user.id}/${itemCat}`, user[itemCat]).subscribe();
                            AppComponent.modalEmit.emit({ alert: { add: { message: 'Thanks for your opinion!', type: 'success' } } });
                            observer.next(true);
                            observer.complete();
                        } else {
                            observer.next(false);
                            AppComponent.modalEmit.emit({ alert: { add: { message: 'You have already rate it', type: 'danger' } } });
                            observer.complete();
                        }
                    }
                );
            }
        );
        return obs;
    }
}
