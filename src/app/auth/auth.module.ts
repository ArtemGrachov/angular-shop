import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AgmCoreModule } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    AgmCoreModule
  ],
  declarations: [LoginComponent, RegComponent],
  providers: [GoogleMapsAPIWrapper]
})
export class AuthModule { }
