import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UsersService } from '../../admin/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    public authService: AuthService,
    public fb: FormBuilder,
  ) { }

  loginForm: FormGroup;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      'email': [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      'password': [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  login() {
    console.log(this.loginForm.get('email'));
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }

}
