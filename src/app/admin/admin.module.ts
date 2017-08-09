import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminUserlistComponent } from './admin-userlist/admin-userlist.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [AdminMainComponent, AdminUserlistComponent]
})
export class AdminModule { }
