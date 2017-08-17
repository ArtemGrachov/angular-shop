import { Injectable, Inject, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UsersService } from '../admin/users.service';

import { User } from '../shared/models/user.model';

@Injectable()
export class AuthService {
    constructor(
        public usersService: UsersService,
        public router: Router,
        public route: ActivatedRoute
    ) { }

    isAuth: boolean = false;
    emit: EventEmitter<any> = new EventEmitter();

    login(email: string, password: string) {
        // test
        let testId = '0';
        if (email === 'admin@mail') {
            testId = '0';
        } else {
            testId = '1';
        }
        // test

        this.isAuth = true;
        this.usersService.setCurrentUserId(testId);
        this.emit.emit();
        this.router.navigate(['/home']);
    }

    logout() {
        this.isAuth = false;
        this.usersService.setCurrentUserId('');
        this.emit.emit();
    }

    registration(newUser) {
        this.router.navigate(['/login']);
        this.emit.emit();
    }

    checkAuth() {
        return this.isAuth;
    }

    checkUserCategory(categories: string[]) {
        if (this.checkAuth()) {
            if (categories.indexOf(
                this.usersService.getCurrentUser().category
            ) > -1) {
                return true;
            }
        }
        return false;
    }
}
