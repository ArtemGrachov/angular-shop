import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderEditGuard } from '../auth/provider-edit-guard.service';

import { ProvidersDetailsComponent } from './providers-details/providers-details.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';
import { ProvidersEditComponent } from './providers-edit/providers-edit.component';

const providersRoutes = [
    {
        path: 'providers', component: ProvidersListComponent, children: [
            { path: 'new', component: ProvidersEditComponent, canActivate: [ProviderEditGuard] },
            { path: ':id', component: ProvidersDetailsComponent },
            { path: ':id/edit', component: ProvidersEditComponent, canActivate: [ProviderEditGuard] },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(providersRoutes)
    ],
    exports: [RouterModule],
    providers: [ProviderEditGuard]
})
export class ProvidersRoutingModule { }
