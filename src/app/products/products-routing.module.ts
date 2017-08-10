import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsCartComponent } from './products-cart/products-cart.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsListComponent } from './products-list/products-list.component';

const productsRoutes = [
    {
        path: 'products', component: ProductsListComponent, children: [
            { path: '', component: ProductsCartComponent },
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
