import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GoogleMapsAPIWrapper } from '@agm/core';

import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../users.service';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html'
})
export class AdminUserProfileComponent implements OnInit {
  constructor(
    private authSerivce: AuthService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private gmapAPI: GoogleMapsAPIWrapper
  ) { }

  public editMode: Boolean = false;
  public newMode: Boolean = false;
  public user = new User('0', '', '', new Date(), 'user', new Date(), 'male', { lat: 48.698200, lng: 26.575637 }, '', [], [], []);
  public userId: string;
  public usersCategories: string[] = [];
  public gmap = {
    location: {
      lat: 48.698200,
      lng: 26.575637
    },
    zoom: 12
  };
  public clientMarkerUrl: string = 'assets/img/client.png';
  @ViewChild('userMarker') userMarker: ElementRef;
  public userForm: FormGroup;
  public preloader: boolean = false;

  ngOnInit() {
    this.usersCategories = this.usersService.getCategories();
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.userId = params['id'];
          this.loadUser();
        } else {
          this.newMode = true;
          this.editMode = true;
          this.buildUserForm();
        }
      }
    );
  }

  loadUser() {
    this.usersService.loadUser(this.userId).subscribe(
      res => {
        this.gmap.location = res.location;
        this.user = res;
        if (!this.userForm) {
          this.buildUserForm();
        }
      }
    );
  }

  changeUserPos(newPos) {
    this.userForm.get('location').patchValue(newPos.coords);
  }

  toggleEditMode() {
    if (this.newMode) {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.editMode = !this.editMode;
      this.reset();
    }
  }

  buildUserForm() {
    this.preloader = false;
    this.userForm = this.fb.group({
      'name': [this.user.name, Validators.required],
      'email': this.user.email,
      'category': this.user.category,
      'password': '',
      'phone': this.user.phone,
      'birthdate': this.user.birthdate,
      'gender': [this.user.gender, Validators.required],
      'location': [this.user.location, Validators.required],
    });
  }

  submit() {
    let updUser = this.userForm.value;
    updUser.id = this.user.id;
    updUser.regDate = this.user.regDate;
    updUser.ratedNews = this.user.ratedNews;
    updUser.ratedProducts = this.user.ratedProducts;
    updUser.ratedProviders = this.user.ratedProviders;

    if (this.newMode) { // redirect an update after respone
      this.authSerivce.createNewUser(updUser).then(
        () => this.router.navigate(['../'], { relativeTo: this.route })
      );
    } else {
      delete updUser.password;
      updUser.email = this.user.email;
      this.usersService.updateUser(updUser).subscribe(
        () => {
          this.editMode = false;
          this.loadUser();
        }
      );
    }
  }

  reset() {
    this.userForm.patchValue(this.user);
  }
}
