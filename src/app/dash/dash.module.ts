import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';


import { DashRoutingModule } from './dash-routing.module';
import { DashMainComponent } from './dash-main/dash-main.component';
import { DashOrdersComponent } from './dash-orders/dash-orders.component';
import { DashProfileComponent } from './dash-profile/dash-profile.component';
import { DashRatedProductsComponent } from './dash-rated-products/dash-rated-products.component';
import { DashRatedNewsComponent } from './dash-rated-news/dash-rated-news.component';

@NgModule({
  imports: [
    SharedModule,
    DashRoutingModule
  ],
  declarations: [DashMainComponent, DashOrdersComponent, DashProfileComponent, DashRatedProductsComponent, DashRatedNewsComponent]
})
export class DashModule { }
