import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsCartComponent } from './products-cart/products-cart.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsMainComponent } from './products-main/products-main.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsOrderingComponent } from './products-ordering/products-ordering.component';

const productsRoutes = [
    { path: 'products/ordering', component: ProductsOrderingComponent },
    {
        path: 'products', component: ProductsMainComponent, children: [
            { path: '', component: ProductsListComponent },
            { path: ':id', component: ProductsDetailsComponent },
        ]
    },
    { path: 'products/:id/edit', component: ProductsEditComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(productsRoutes)
    ],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
