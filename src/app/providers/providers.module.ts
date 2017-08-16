import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ProvidersRoutingModule } from './providers-routing.module';

import { ProvidersListComponent } from './providers-list/providers-list.component';
import { ProvidersDetailsComponent } from './providers-details/providers-details.component';
import { ProvidersEditComponent } from './providers-edit/providers-edit.component';
import { CommentsComponent } from './providers-details/comments/comments.component';
import { ProductsComponent } from './providers-details/products/products.component';
import { DescriptionComponent } from './providers-details/description/description.component';

@NgModule({
  imports: [
    ProvidersRoutingModule,
    SharedModule
  ],
  declarations: [
    ProvidersListComponent,
    ProvidersDetailsComponent,
    ProvidersEditComponent,
    CommentsComponent,
    ProductsComponent,
    DescriptionComponent
  ]
})
export class ProvidersModule { }
