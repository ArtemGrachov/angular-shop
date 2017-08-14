import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashMainComponent } from './dash-main/dash-main.component';
import { DashOrdersComponent } from './dash-orders/dash-orders.component';
import { DashProfileComponent } from './dash-profile/dash-profile.component';
import { DashRatedProductsComponent } from './dash-rated-products/dash-rated-products.component';
import { DashRatedNewsComponent } from './dash-rated-news/dash-rated-news.component';
import { DashRatedProvidersComponent } from './dash-rated-providers/dash-rated-providers.component';

const dashRoutes: Routes = [
  {
    path: 'dash', component: DashMainComponent, children: [
      { path: '', component: DashProfileComponent },
      { path: 'orders', component: DashOrdersComponent },
      { path: 'products', component: DashRatedProductsComponent },
      { path: 'news', component: DashRatedNewsComponent },
      { path: 'providers', component: DashRatedProvidersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashRoutes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
