import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminUserProfileComponent } from './admin-user-profile/admin-user-profile.component';
import { AdminStatComponent } from './admin-stat/admin-stat.component';
import { AdminCommentsComponent } from './admin-comments/admin-comments.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminMainComponent,
    AdminUsersComponent,
    AdminOrdersComponent,
    AdminUserProfileComponent,
    AdminStatComponent,
    AdminCommentsComponent
  ]
})
export class AdminModule { }
