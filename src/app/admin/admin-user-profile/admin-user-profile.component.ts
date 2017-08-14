import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../users.service';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  styleUrls: ['./admin-user-profile.component.css']
})
export class AdminUserProfileComponent implements OnInit {
  editMode: Boolean = false;
  newMode: Boolean = false;
  user = new User(
    '0',
    '',
    '',
    new Date(),
    'user',
    new Date(),
    'male'
  );
  userId: String = '';

  userForm: FormGroup;

  constructor(
    public usersService: UsersService,
    public router: Router,
    public route: ActivatedRoute,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.userId = params['id'];
          this.refreshUser();
        } else {
          this.newMode = true;
          this.editMode = true;
        }
      }
    );
    this.buildUserForm();
    this.usersService.emit.subscribe(
      () => this.refreshUser()
    );
  }


  refreshUser() {
    this.user = this.usersService.getUser(this.userId);
  }

  toggleEditMode() {
    if (this.newMode) {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.editMode = !this.editMode;
    }
  }

  buildUserForm() {
    this.userForm = this.fb.group({
      'name': this.user.name,
      'email': this.user.email,
      'category': this.user.category,
      'birthdate': this.user.birthdate,
      'gender': this.user.gender,
      'id': this.user.id,
      'regdate': this.user.regdate
    });
  }

  submit() {
    if (this.newMode) {
      this.usersService.addUser(this.userForm.value);
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.usersService.updateUser(this.userForm.value);
      this.editMode = false;
    }
  }

  reset() {
    this.userForm.patchValue(this.user);
  }

  delete() {
    this.usersService.deleteUser(this.user.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
