import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashRoutingModule } from './dash-routing.module';
import { DashMainComponent } from './dash-main/dash-main.component';

@NgModule({
  imports: [
    CommonModule,
    DashRoutingModule
  ],
  declarations: [DashMainComponent]
})
export class DashModule { }
