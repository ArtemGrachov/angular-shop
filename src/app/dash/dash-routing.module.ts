import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashMainComponent } from './dash-main/dash-main.component';
import { DashOrdersComponent } from './dash-orders/dash-orders.component';
import { DashProfileComponent } from './dash-profile/dash-profile.component';
import { DashRatedProductsComponent } from './dash-rated-products/dash-rated-products.component';

const dashRoutes: Routes = [
  {
    path: 'dash', component: DashMainComponent, children: [
      { path: '', component: DashProfileComponent },
      { path: 'orders', component: DashOrdersComponent },
      { path: 'products', component: DashRatedProductsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashRoutes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
