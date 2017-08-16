import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../auth/admin-guard.service';

import { ProvidersDetailsComponent } from './providers-details/providers-details.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';
import { ProvidersEditComponent } from './providers-edit/providers-edit.component';

const providersRoutes = [
    {
        path: 'providers', component: ProvidersListComponent, children: [
            { path: 'new', component: ProvidersEditComponent, canActivate: [AdminGuard] },
            { path: ':id', component: ProvidersDetailsComponent },
            { path: ':id/edit', component: ProvidersEditComponent, canActivate: [AdminGuard] },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(providersRoutes)
    ],
    exports: [RouterModule],
    providers: [AdminGuard]
})
export class ProvidersRoutingModule { }
