import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AgmCoreModule } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminUserProfileComponent } from './admin-user-profile/admin-user-profile.component';
import { AdminStatComponent } from './admin-stat/admin-stat.component';
import { AdminCommentsComponent } from './admin-comments/admin-comments.component';
import { AdminChartsComponent } from './admin-charts/admin-charts.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { ProductsComponent } from './admin-reports/products/products.component';
import { ProvidersComponent } from './admin-reports/providers/providers.component';
import { UsersComponent } from './admin-reports/users/users.component';
import { OrdersComponent } from './admin-reports/orders/orders.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    AgmCoreModule,
    ChartsModule
  ],
  declarations: [
    AdminMainComponent,
    AdminUsersComponent,
    AdminOrdersComponent,
    AdminUserProfileComponent,
    AdminStatComponent,
    AdminCommentsComponent,
    AdminChartsComponent,
    AdminReportsComponent,
    ProductsComponent,
    ProvidersComponent,
    UsersComponent,
    OrdersComponent
  ],
  providers: [GoogleMapsAPIWrapper]
})
export class AdminModule { }
