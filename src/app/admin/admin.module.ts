import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminUserlistComponent } from './admin-userlist/admin-userlist.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdminMainComponent, AdminUserlistComponent]
})
export class AdminModule { }
