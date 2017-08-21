import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminUserProfileComponent } from './admin-user-profile/admin-user-profile.component';
import { AdminStatComponent } from './admin-stat/admin-stat.component';
import { AdminCommentsComponent } from './admin-comments/admin-comments.component';

const adminRoutes = [
    {
        path: 'admin', component: AdminMainComponent, children: [
            { path: '', component: AdminStatComponent },
            { path: 'users', component: AdminUsersComponent },
            { path: 'users/new', component: AdminUserProfileComponent },
            { path: 'users/:id', component: AdminUserProfileComponent },
            { path: 'orders', component: AdminOrdersComponent },
            { path: 'comments', component: AdminCommentsComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AdminRoutingModule { }
