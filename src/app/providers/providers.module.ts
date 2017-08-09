import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';

import { ProvidersListComponent } from './providers-list/providers-list.component';
import { ProvidersDetailsComponent } from './providers-details/providers-details.component';
import { ProvidersEditComponent } from './providers-edit/providers-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ProvidersRoutingModule
  ],
  declarations: [ProvidersListComponent, ProvidersDetailsComponent, ProvidersEditComponent]
})
export class ProvidersModule { }
