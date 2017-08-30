import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../admin/users.service';

import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  constructor(
    private usersService: UsersService
  ) { }

  public preloader: boolean = true;
  public users: User[] = [];

  ngOnInit() {
    this.usersService.loadUsers().subscribe(
      users => {
        this.users = users;
        this.preloader = false;
      }
    );
  }

}
