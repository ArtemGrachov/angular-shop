import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsCartComponent } from './products-cart/products-cart.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsMainComponent } from './products-main/products-main.component';
import { ProductsOrderingComponent } from './products-ordering/products-ordering.component';

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ProductsListComponent,
    ProductsEditComponent,
    ProductsCartComponent,
    ProductsDetailsComponent,
    ProductsMainComponent,
    ProductsOrderingComponent
  ],
  providers: []
})
export class ProductsModule { }