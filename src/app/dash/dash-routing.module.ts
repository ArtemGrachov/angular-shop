import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashMainComponent } from './dash-main/dash-main.component';

const dashRoutes: Routes = [
  { path: 'dash', component: DashMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(dashRoutes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
