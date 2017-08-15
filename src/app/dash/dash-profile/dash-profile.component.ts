import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../admin/users.service';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-dash-profile',
  templateUrl: './dash-profile.component.html',
  styleUrls: ['./dash-profile.component.css']
})
export class DashProfileComponent implements OnInit {
  editMode: Boolean = false;
  user: User;
  profileForm: FormGroup;

  constructor(
    public usersService: UsersService,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.refreshUser();
    this.usersService.emit.subscribe(
      () => this.refreshUser()
    );
    this.buildProfileForm();
  }

  refreshUser() {
    this.user = this.usersService.getCurrentUser();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  buildProfileForm() {
    this.profileForm = this.fb.group({
      'name': [this.user.name, Validators.required],
      'email': [this.user.email, [Validators.required, Validators.email]],
      'category': [this.user.category, Validators.required],
      'birthdate': [this.user.birthdate, Validators.required],
      'gender': [this.user.gender, Validators.required],
      'id': this.user.id,
      'regdate': this.user.regdate
    });
  }

  reset() {
    this.profileForm.patchValue(this.user);
  }

  submit() {
    this.usersService.updateUser(this.profileForm.value);
    this.editMode = false;
  }
}
