import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    public usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.loadUsers().subscribe(
      res => this.users = res
    );
  }
}
