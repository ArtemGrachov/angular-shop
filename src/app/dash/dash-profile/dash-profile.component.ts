import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GoogleMapsAPIWrapper } from '@agm/core';

import { UsersService } from '../../admin/users.service';
import { AuthService } from '../../auth/auth.service';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-dash-profile',
  templateUrl: './dash-profile.component.html',
  styleUrls: ['./dash-profile.component.css']
})
export class DashProfileComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    public authService: AuthService,
    public fb: FormBuilder,
    public gmapAPI: GoogleMapsAPIWrapper
  ) { }

  @ViewChild('userMarker') userMarker: ElementRef;

  editMode: Boolean = false;
  user: any;
  profileForm: FormGroup;
  clientMarkerUrl: string = 'assets/img/client.png';

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.authService.loadCurrentUser().subscribe(
      res => {
        this.user = res;
        if (!this.profileForm) {
          this.buildProfileForm();
        }
      }
    );
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.reset();
  }

  changeUserPos(newPos) {
    this.profileForm.get('location').patchValue(newPos.coords);
  }

  buildProfileForm() {
    this.profileForm = this.fb.group({
      'name': [this.user.name, Validators.required],
      'email': [this.user.email, [Validators.required, Validators.email]],
      'password': [''],
      'category': [this.user.category, Validators.required],
      'birthdate': [this.user.birthdate, Validators.required],
      'gender': [this.user.gender, Validators.required],
      'phone': [this.user.phone, Validators.required],
      'location': [this.user.location, Validators.required],
    });
  }

  reset() {
    this.profileForm.patchValue(this.user);
  }

  submit() {
    let updUser = this.profileForm.value;
    updUser.id = this.user.id;
    updUser.regdate = this.user.regdate;
    updUser.ratedNews = this.user.ratedNews;
    updUser.ratedProducts = this.user.ratedProducts;
    updUser.ratedProviders = this.user.ratedProviders;

    this.usersService.updateCurrentUser(updUser).subscribe(
      () => {
        this.editMode = false;
        this.loadProfile();
      }
    );
  }
}
