import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeMainComponent } from './home-main/home-main.component';

const homeRoutes = [
    {
        path: 'home', component: HomeMainComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
