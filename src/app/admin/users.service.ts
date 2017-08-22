import { Injectable, Inject, EventEmitter } from '@angular/core';

import { AlertsService } from '../alerts/alerts.service';
import { DataService } from '../shared/data.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../shared/models/user.model';

@Injectable()
export class UsersService {
    constructor(
        public alertsService: AlertsService,
        public dataService: DataService,
        public firebaseAuth: AngularFireAuth
    ) { }

    users: User[] = [];

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
        return this.updateUser(updatedUser).map(
            () => {
                if (updatedUser.password) {
                    // reassign!
                    currentUser.updatePassword(updatedUser.password);
                }
                currentUser.updateEmail(updatedUser.email);
            }
        );
    }

    getLatest(count: number): User[] {
        const sortedUsers: User[] = this.users.slice().sort(
            function (a, b) {
                if (a.regdate < b.regdate) {
                    return 1;
                } else if (a.regdate > b.regdate) {
                    return - 1;
                } else {
                    return 0;
                }
            }
        );
        return sortedUsers.slice(0, count);
    }

    getCount(): number {
        return this.users.length;
    }
}
