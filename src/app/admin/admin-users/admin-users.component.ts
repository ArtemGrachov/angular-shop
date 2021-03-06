import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html'
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usersService: UsersService
  ) { }
  public preloader: boolean = true;

  ngOnInit() {
    this.usersService.loadUsers().subscribe(
      res => this.users = res,
      err => this.preloader = false,
      () => this.preloader = false
    );
  }
}
