import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UsersService } from '../../admin/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private fb: FormBuilder,
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
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }

  loginFacebook() {
    this.authService.loginFacebook();
  }
}
