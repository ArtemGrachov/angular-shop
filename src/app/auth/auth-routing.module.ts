import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';


const authRoutes = [
    { path: 'login', component: LoginComponent },
    { path: 'reg', component: RegComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AuthRoutingModule { }
