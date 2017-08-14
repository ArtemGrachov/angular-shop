import { Injectable, EventEmitter } from '@angular/core';

import { User } from '../shared/models/user.model';

@Injectable()
export class UsersService {
    users: User[] = [
        new User(
            '0',
            'Admin',
            'admin@mail.com',
            new Date(),
            'admin',
            new Date(),
            'male'
        ),
        new User(
            '1',
            'Test user',
            'admin@mail.com',
            new Date(),
            'user',
            new Date(),
            'male'
        )
    ];

    emit: EventEmitter<any> = new EventEmitter();

    currentUser: User = this.users[0];

    getUsers() {
        return this.users;
    }

    getUser(id) {
        return this.users.find(
            (user) => user.id === id
        );
    }

    addUser(newUser: User) {
        // test 'unique' id
        const testId = Math.floor(Math.random() * 1000);
        newUser.id = testId.toString();
        // test 'unique' id

        this.users.push(newUser);
        this.emit.emit();
    }

    updateUser(updatedUser: User) {
        for (let i in this.users) {
            if (this.users[i].id === updatedUser.id) {
                this.users[i] = updatedUser;
                this.emit.emit();
            }
        }
    }

    deleteUser(id: string) {
        for (const index in this.users) {
            if (this.users[index].id === id) {
                this.users.splice(+index, 1);
                this.emit.emit();
            }
        }
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
