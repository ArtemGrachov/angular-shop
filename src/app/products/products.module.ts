import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsCartComponent } from './products-cart/products-cart.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsMainComponent } from './products-main/products-main.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  declarations: [ProductsListComponent,
    ProductsEditComponent,
    ProductsCartComponent,
    ProductsDetailsComponent,
    ProductsMainComponent
  ],
  providers: []
})
export class ProductsModule { }
