import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsBookingComponent } from './products-booking/products-booking.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  declarations: [ProductsListComponent, ProductsDetailsComponent, ProductsEditComponent, ProductsBookingComponent]
})
export class ProductsModule { }
