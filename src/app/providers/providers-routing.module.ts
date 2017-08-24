import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidersEditGuard } from '../auth/route-guard/providers-edit-guard.service';
import { AdminGuard } from '../auth/route-guard/admin-guard.service';

import { ProvidersDetailsComponent } from './providers-details/providers-details.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';
import { ProvidersEditComponent } from './providers-edit/providers-edit.component';
import { ProvidersRatingComponent } from './providers-rating/providers-rating.component';
import { CommentsComponent } from './providers-details/comments/comments.component';
import { ProductsComponent } from './providers-details/products/products.component';
import { DescriptionComponent } from './providers-details/description/description.component';

const providersRoutes = [
    {
        path: 'providers', component: ProvidersListComponent, children: [
            { path: '', component: ProvidersRatingComponent },
            { path: 'new', component: ProvidersEditComponent, canActivate: [AdminGuard] },
            {
                path: ':id', component: ProvidersDetailsComponent, children: [
                    { path: 'comments', component: CommentsComponent },
                    { path: 'products', component: ProductsComponent },
                    { path: 'description', component: DescriptionComponent },
                    { path: '', component: DescriptionComponent }
                ]
            },
            { path: ':id/edit', component: ProvidersEditComponent, canActivate: [ProvidersEditGuard] },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(providersRoutes)
    ],
    exports: [RouterModule],
    providers: [ProvidersEditGuard, AdminGuard]
})
export class ProvidersRoutingModule { }
