import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent, RegComponent]
})
export class AuthModule { }
