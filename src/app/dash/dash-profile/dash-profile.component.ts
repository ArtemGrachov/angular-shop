import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GoogleMapsAPIWrapper } from '@agm/core';

import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../admin/users.service';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-dash-profile',
  templateUrl: './dash-profile.component.html'
})
export class DashProfileComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private fb: FormBuilder,
    private gmapAPI: GoogleMapsAPIWrapper
  ) { }

  @ViewChild('userMarker') userMarker: ElementRef;

  public editMode: Boolean = false;
  public user: any;
  public profileForm: FormGroup;
  public clientMarkerUrl: string = 'assets/img/client.png';
  public preloader: boolean = true;

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
    this.preloader = false;
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
    updUser.regDate = this.user.regDate;
    updUser.ratedNews = this.user.ratedNews;
    updUser.ratedProducts = this.user.ratedProducts;
    updUser.ratedProviders = this.user.ratedProviders;
    if (updUser.birthdate && updUser.birthdate.jsdate) {
      updUser.birthdate = updUser.birthdate.jsdate;
    }

    this.usersService.updateCurrentUser(updUser).subscribe(
      () => {
        this.editMode = false;
        this.loadProfile();
      }
    );
  }
}
