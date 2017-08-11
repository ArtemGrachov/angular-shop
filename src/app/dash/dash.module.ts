import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashRoutingModule } from './dash-routing.module';
import { DashMainComponent } from './dash-main/dash-main.component';
import { DashOrdersComponent } from './dash-orders/dash-orders.component';
import { DashProfileComponent } from './dash-profile/dash-profile.component';

@NgModule({
  imports: [
    CommonModule,
    DashRoutingModule
  ],
  declarations: [DashMainComponent, DashOrdersComponent, DashProfileComponent]
})
export class DashModule { }
