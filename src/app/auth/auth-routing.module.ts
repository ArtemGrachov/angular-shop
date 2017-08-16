import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestGuard } from './guest-guard.service';

import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';


const authRoutes = [
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'reg', component: RegComponent, canActivate: [GuestGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [RouterModule],
    providers: [GuestGuard]
})
export class AuthRoutingModule { }
