import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsEditGuard } from '../auth/products-edit-guard.service';

import { ProductsCartComponent } from './products-cart/products-cart.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsMainComponent } from './products-main/products-main.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsOrderingComponent } from './products-ordering/products-ordering.component';

const productsRoutes = [
    { path: 'products/new', component: ProductsEditComponent, canActivate: [ProductsEditGuard] },
    { path: 'products/ordering', component: ProductsOrderingComponent },
    {
        path: 'products', component: ProductsMainComponent, children: [
            { path: '', component: ProductsListComponent },
            { path: ':id', component: ProductsDetailsComponent },
        ]
    },
    { path: 'products/:id/edit', component: ProductsEditComponent, canActivate: [ProductsEditGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(productsRoutes)
    ],
    exports: [RouterModule],
    providers: [ProductsEditGuard]
})
export class ProductsRoutingModule { }
