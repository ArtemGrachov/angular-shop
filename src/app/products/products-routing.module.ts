import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsBookingComponent } from './products-booking/products-booking.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsListComponent } from './products-list/products-list.component';

const productsRoutes = [
    {
        path: 'products', component: ProductsListComponent, children: [
            { path: 'booking', component: ProductsBookingComponent },
            { path: ':id', component: ProductsDetailsComponent },
            { path: ':id/edit', component: ProductsEditComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(productsRoutes)
    ],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
