import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GoogleMapsAPIWrapper } from '@agm/core';

import { AuthService } from '../auth.service';
import { UsersService } from '../../admin/users.service';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html'
})
export class RegComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private fb: FormBuilder,
    private gmapAPI: GoogleMapsAPIWrapper
  ) { }

  gmap = {
    lat: 48.698200,
    lng: 26.575637,
    zoom: 16
  };
  clientMarkerUrl: string = 'assets/img/client.png';
  @ViewChild('userMarker') userMarker: ElementRef;

  regForm: FormGroup;

  ngOnInit() {
    this.buildRegForm();
  }

  buildRegForm() {
    this.regForm = this.fb.group({
      'email': ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      'password': [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
      'name': [
        '',
        [
          Validators.required,
          Validators.pattern(/^[а-яА-ЯіІїЇёЁa-zA-Z_]+$/)
        ]
      ],
      'birthdate': [
        ''
      ],
      'phone': [
        '',
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.minLength(13),
          Validators.pattern(/^\+380[0-9]*$/)
        ]
      ],
      'gender': [
        '',
        [
          Validators.required
        ]
      ],
      'location': [
        { lat: this.gmap.lat, lng: this.gmap.lng }
      ]
    });
  }


  changeUserPos(newPos) {
    this.regForm.get('location').patchValue(newPos.coords);
  }

  reg() {
    let newUser = this.regForm.value;
    if (newUser.birthdate && newUser.birthdate.jsdate) {
      newUser.birthdate = newUser.birthdate.jsdate;
    }
    this.authService.registration(this.regForm.value);
  }

}
