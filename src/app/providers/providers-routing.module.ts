import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidersDetailsComponent } from './providers-details/providers-details.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';
import { ProvidersEditComponent } from './providers-edit/providers-edit.component';
import { CommentsComponent } from './providers-details/comments/comments.component';
import { ProductsComponent } from './providers-details/products/products.component';
import { DescriptionComponent } from './providers-details/description/description.component';

const providersRoutes = [
    {
        path: 'providers', component: ProvidersListComponent, children: [
            { path: 'new', component: ProvidersEditComponent },
            {
                path: ':id', component: ProvidersDetailsComponent, children: [
                    { path: 'comments', component: CommentsComponent },
                    { path: 'products', component: ProductsComponent },
                    { path: 'description', component: DescriptionComponent },
                    { path: '', component: DescriptionComponent }
                ]
            },
            { path: ':id/edit', component: ProvidersEditComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(providersRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class ProvidersRoutingModule { }
