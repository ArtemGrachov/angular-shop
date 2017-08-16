import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GoogleMapsAPIWrapper } from '@agm/core';

import { UsersService } from '../../admin/users.service';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-dash-profile',
  templateUrl: './dash-profile.component.html',
  styleUrls: ['./dash-profile.component.css']
})
export class DashProfileComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    public fb: FormBuilder,
    public gmapAPI: GoogleMapsAPIWrapper
  ) { }

  @ViewChild('userMarker') userMarker: ElementRef;

  editMode: Boolean = false;
  user: User;
  profileForm: FormGroup;
  gmap = {
    lat: this.usersService.getCurrentUser().location.lat,
    lng: this.usersService.getCurrentUser().location.lng,
    zoom: 16
  };
  clientMarkerUrl: string = 'assets/img/client.png';

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

  changeUserPos(newPos) {
    this.profileForm.get('location').patchValue(newPos.coords);
  }

  buildProfileForm() {
    this.profileForm = this.fb.group({
      'name': [this.user.name, Validators.required],
      'email': [this.user.email, [Validators.required, Validators.email]],
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

    this.usersService.updateUser(updUser);
    this.editMode = false;
  }
}
