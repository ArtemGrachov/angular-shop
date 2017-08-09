import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminUserlistComponent } from './admin-userlist/admin-userlist.component';


const authRoutes = [
    {
        path: 'admin', component: AdminMainComponent, children: [
            { path: 'userlist', component: AdminUserlistComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
