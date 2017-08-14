import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';


import { DashRoutingModule } from './dash-routing.module';
import { DashMainComponent } from './dash-main/dash-main.component';
import { DashOrdersComponent } from './dash-orders/dash-orders.component';
import { DashProfileComponent } from './dash-profile/dash-profile.component';
import { DashRatedProductsComponent } from './dash-rated-products/dash-rated-products.component';

@NgModule({
  imports: [
    SharedModule,
    DashRoutingModule
  ],
  declarations: [DashMainComponent, DashOrdersComponent, DashProfileComponent, DashRatedProductsComponent]
})
export class DashModule { }
