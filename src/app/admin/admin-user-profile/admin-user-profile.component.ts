import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GoogleMapsAPIWrapper } from '@agm/core';

import { UsersService } from '../users.service';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  styleUrls: ['./admin-user-profile.component.css']
})
export class AdminUserProfileComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    public router: Router,
    public route: ActivatedRoute,
    public fb: FormBuilder,
    public gmapAPI: GoogleMapsAPIWrapper
  ) { }

  editMode: Boolean = false;
  newMode: Boolean = false;
  user = new User('0', '', '', new Date(), 'user', new Date(), 'male', { lat: 0, lng: 0 }, '', [], [], []);
  userId: string = '';
  regDate;
  usersCategories: string[] = [];
  gmap = {
    lat: 0,
    lng: 0,
    zoom: 12
  };
  clientMarkerUrl: string = 'assets/img/client.png';
  @ViewChild('userMarker') userMarker: ElementRef;

  userForm: FormGroup;

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
        this.gmap.lat = res.location.lat;
        this.gmap.lng = res.location.lng;
        this.user = res;
        this.regDate = res.regDate;
        console.log(res);
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
    this.userForm = this.fb.group({
      'name': [this.user.name, Validators.required],
      'category': [{ value: this.user.category, disabled: (this.userId === '0' ? true : false) }],
      'phone': this.user.phone,
      'birthdate': this.user.birthdate,
      'gender': [this.user.gender, Validators.required],
      'location': [this.user.location, Validators.required],
    });
  }

  submit() {
    let updUser = this.userForm.value;
    updUser.id = this.user.id;
    updUser.email = this.user.email;
    updUser.regdate = this.user.regdate;
    updUser.ratedNews = this.user.ratedNews;
    updUser.ratedProducts = this.user.ratedProducts;
    updUser.ratedProviders = this.user.ratedProviders;

    if (this.newMode) {
      this.usersService.addUser(updUser);
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
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
